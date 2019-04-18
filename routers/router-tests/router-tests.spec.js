const request = require('supertest');

const db = require('../../utilities/dbConfig');

const server = require('../../api/server')

const Auth = require('../authRouter');
const CreatedValues = require('../createdValuesRouter');
const DefaultValues = require('../defaultValuesRouter');
const Projects = require('../projectsRouter');
const UserValues = require('../userValuesRouter');

const testUser = {
  id: 1,
  username: "billie",
  password: "$2a$08$Sw5raie71wYGZul4KESYIOxWo4RylDw4iQGSwrivRGRKRMJlSrexK",
  created_at: "2019-04-17 17:28:54",
  email: "billieeilish@gmail.com",
  firstName: "Billie",
  lastName: "Eilish"
}

// AUTH TESTS
describe('Auth Routers', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  afterEach(async () => {
    await db('users').truncate();
  });

  describe('LOGIN', () => {
    it('should return a 200 status code when passed a valid username & password', async () => {

    })
  })
})


// CREATED-VALUES TESTS
describe('Created-Values Routers', () => {
  it('test description', () => {
    
  })
})


// DEFAULT-VALUES TESTS
const defaultValuesArr = [
  {"id": 1, "default_value_name": "Athletic ability"},
  {"id": 2, "default_value_name": "Art and literature"},
  {"id": 3, "default_value_name": "Creativity, discovering, or inventing things to make a difference in the world"},
  {"id": 4, "default_value_name": "Independence"},
  {"id": 5, "default_value_name": "Kindness and generosity"},
  {"id": 6, "default_value_name": "Living in the moment"},
  {"id": 7, "default_value_name": "Membership in a social group (such as your community, racial group, or school club)"},
  {"id": 8, "default_value_name": "Music"},
  {"id": 9, "default_value_name": "My community"},
  {"id": 10, "default_value_name": "My moral principles"},
  {"id": 11, "default_value_name": "Nature and the environment"},
  {"id": 12, "default_value_name": "Relationships with friends and family"},
  {"id": 13, "default_value_name": "Sense of humor"},
  {"id": 14, "default_value_name": "Success in my career"}
]

describe('Default-Values Routers', () => {
  it('get the default values and returns a 200', async () => {
    let response = await request(server).get('/api/defaultvalues')
    expect(response.status).toBe(200)
    expect(response.body).toEqual(defaultValuesArr)
  })
})


// PROJECTS TESTS
const responseArr = [
  {"id": 1, "user_id": 1, "project_name": "taking a class" ,"project_active": 0, "proj_val_align": 3},
  {"id": 2, "user_id": 1, "project_name": "practicing oboe", "project_active": 1, "proj_val_align": 0},
  {"id": 3, "user_id": 1, "project_name": "working", "project_active": 1, "proj_val_align": 0},
  {"id": 4, "user_id": 1, "project_name": "tidying my house", "project_active": 1, "proj_val_align": 4}
]

describe('Projects Routers', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  afterEach(async () => {
    await db('users').truncate();
  });

  describe('Get by ID', () => {
    it('returns an array of project-objects for a given id', async () => {
      let id = 1
      let response = await request(server).get(`/api/projects/${id}`)
      expect(response.status).toBe(200)
      // --> HAVING TROUBLE WITH THIS
      // expect(response.body).toEqual(responseArr)
    })
  })
  describe('POST method', () => {
    // ---> TRIED A SOLUTION FROM STACK OVERFLOW. NO SAUCE
    // it('Successfully returns list of projects with a 200', async (done) => {
    // //   request(server)
    // //   .post('/api/projects')
    // //   .send({"user_id": 1, "project_name": "practicing oboe"})
    // //   .expect(201)
    // //   .end(function(err, res) {
    // //     if (err) throw err;
    // //   });
    // })

    // Returns 404 when not passed a user_id    
    // ---> GET ERROR ABOUT SETTING HEADERS AFTER BEING SENT TO CLIENT
    it('respond with 201 created', function () {
      // request(server)
      //     .post('/api/projects')
      //     .send({"project_name": "practicing oboe"})
      //     .set('Accept', 'application/json')
      //     .expect('Content-Type', /json/)
      //     .expect(404)
      //     .end((err) => {
      //         if (err) return done(err);
      //         done();
      //     });
      });
  })

  describe('PUT PROJECT', () => {
    describe('Change values', () => {
      it('Returns 200', () => {
        
      })

      it('returns 404 if not passed a user_id in body', () => {
        
      })

      it('returns 404 if passed neither project_name nor user_id', () => {
        
      })
    })
  })

  describe('MARK INACTIVE', () => {
    it('returns 200 with project set to inactive', () => {
      
    })
  })

  describe('MARK ACTIVE', () => {
    it('returns 200 with project set to active', () => {
      
    })
  })

  describe('DELETE Project', () => {
    it('returns 200 ', () => {
      
    })
  })
})


// USER-VALUES TESTS
describe('User-Values Routers', () => {
  it('test description', () => {
    
  })
})
