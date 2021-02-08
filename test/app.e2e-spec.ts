import { UserAuthPayload } from 'src/common/models/user.model';
import { CreateUserDto, UpdateUserDto } from 'src/domains/users/models/user.dto';
import request from 'supertest';

const app = 'http://localhost:3000';
const keyXApiKey = 'test';
// mocked users
const userStandard: UserAuthPayload = {
  username: 'test@mail.net',
  password: '$2b$12$tbQglAK5CKw9Z5u3TbsOkeW3KA4kyYifekd6Es6ckvPb3UwU8PBL2',
};
const adminUser: UserAuthPayload = {
  username: 'admin@admin.com',
  password: 'admin',
};
const userNotRegistered = {
  username: 'abcde@mail.net',
  password: 'a$2b$12$tbQglAK5CKw9Z5u3TbsOkeW3KA4kyYifekd6Es6ckvPb3UwU8PBL2min',
};

const updateInfoUser: UpdateUserDto = {
  firstName: 'toto3',
  lastName: 'TOTO3',
  phone: '4382341242',
};

async function getTockenFromUser(userPayload): Promise<any> {
  return await await request(app)
    .post('/auth/login')
    .set('x-api-key', keyXApiKey)
    .set('Accept', 'application/json')
    .send(userPayload);
}

function generateRandomCharacters(size) {
  var generatedOutput = '';
  var storedCharacters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var totalCharacterSize = storedCharacters.length;
  for (var index = 0; index < size; index++) {
    generatedOutput += storedCharacters.charAt(Math.floor(Math.random() * totalCharacterSize));
  }
  return generatedOutput;
}

describe('Root', () => {
  it('server ping', () => {
    return request(app).get('/').set('x-api-key', keyXApiKey).expect(200).expect('Hello World!');
  });
});

describe('Auth', () => {
  let req;
  beforeEach(() => {
    req = request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .set('x-api-key', keyXApiKey);
  });

  it('should register', () => {
    const sendedReq = req.send(userStandard);
    return sendedReq.expect(201);
  });

  it('has bad request', () => {
    const fakeUser = {
      email: 'test@mail.net',
      password: 'a$2b$12$tbQglAK5CKw9Z5u3TbsOkeW3KA4kyYifekd6Es6ckvPb3UwU8PBL2min',
    } as any;

    const sendedReq = req.send(fakeUser);

    return sendedReq.expect(302);
  });

  it('has no user matching', () => {
    const sendedReq = req.send(userNotRegistered);

    return sendedReq.expect(302);
  });
});

describe('User Controller', () => {
  let token = null;
  beforeAll(async (done) => {
    const res = await getTockenFromUser(adminUser);
    token = res.body.access_token;
    done();
  });

  describe('GET /users', () => {
    it('should return an array of users', () => {
      const req = request(app)
        .get('/users')
        .set('Accept', 'application/json')
        .set('x-api-key', keyXApiKey)
        .set('Authorization', `Bearer ${token}`);

      return req.expect(200).expect(({ body }) => expect(body).toBeDefined());
    });

    it('should not working because token altered', async () => {
      const req = request(app)
        .get('/users')
        .set('Accept', 'application/json')
        .set('x-api-key', keyXApiKey)
        .set('Authorization', `Bearer ${token}+1`);
      return req.expect(302);
    });
  });

  let newUser: CreateUserDto;
  const userEmail: string = generateRandomCharacters(4) + '@mail.com';
  beforeAll(() => {
    newUser = {
      email: userEmail,
      firstName: 'toto3',
      lastName: 'TOTO3',
      password: 'toto3',
      phone: '4382341242',
    };
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const req = request(app)
        .post('/users')
        .set('Accept', 'application/json')
        .set('x-api-key', keyXApiKey)
        .set('Authorization', `Bearer ${token}`);

      const sendedReq = req.send(newUser);

      return sendedReq.expect(201);
    });

    it('should not create a new user, if user already exists', async () => {
      const req = request(app)
        .post('/users')
        .set('Accept', 'application/json')
        .set('x-api-key', keyXApiKey)
        .set('Authorization', `Bearer ${token}`);
      const sendedReq = req.send(newUser);

      return sendedReq.expect(409);
    });

    it('should not create a new user, because something wrong in the body', async () => {
      const req = request(app)
        .post('/users')
        .set('Accept', 'application/json')
        .set('x-api-key', keyXApiKey)
        .set('Authorization', `Bearer ${token}`);

      const alteredNewUser = Object.assign({}, newUser);
      alteredNewUser.email = 'error@mail.io';

      const sendedReq = req.send(alteredNewUser);

      return sendedReq.expect(400);
    });
  });

  describe('PUT /users', () => {
    it('should update a user', async () => {
      const req = request(app)
        .put('/users/' + newUser.email)
        .set('Accept', 'application/json')
        .set('x-api-key', keyXApiKey)
        .set('Authorization', `Bearer ${token}`);

      const sendedReq = req.send(updateInfoUser);

      return sendedReq.expect(200);
    });

    it('should not update because user doesn t exist', async () => {
      const emailOfuserToUpdate = 'efzefz@mail.com';
      const req = request(app)
        .put('/users/' + emailOfuserToUpdate)
        .set('Accept', 'application/json')
        .set('x-api-key', keyXApiKey)
        .set('Authorization', `Bearer ${token}`);

      const sendedReq = req.send(updateInfoUser);

      return sendedReq.expect(404);
    });
    it("should not update because email isn't valid", async () => {
      const emailOfuserToUpdate = 'error@mail.io';
      const req = request(app)
        .put('/users/' + emailOfuserToUpdate)
        .set('Accept', 'application/json')
        .set('x-api-key', keyXApiKey)
        .set('Authorization', `Bearer ${token}`);

      const sendedReq = req.send(updateInfoUser);

      return sendedReq.expect(400);
    });
  });

  describe('DELETE /users', () => {
    it('should delete user', async () => {
      const req = request(app)
        .delete('/users/' + newUser.email)
        .set('Accept', 'application/json')
        .set('x-api-key', keyXApiKey)
        .set('Authorization', `Bearer ${token}`);

      const sendedReq = req.send(newUser);

      return sendedReq.expect(200);
    });
    it('should not delete a user, because this user doesn t exist', async () => {
      const req = request(app)
        .delete('/users/' + newUser.email)
        .set('Accept', 'application/json')
        .set('x-api-key', keyXApiKey)
        .set('Authorization', `Bearer ${token}`);
      const sendedReq = req.send(newUser);

      return sendedReq.expect(404);
    });
  });
});
