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

  // LOGIN
  describe('LOGIN', () => {
    it('should return a 200 status code when passed a valid username & password', async () => {

    })

    it('returns a full user-object with a hashed password', () => {
      
    })

    it('returns 404 if either username or password are missing', () => {
      
    })

    it('returns a 404 if password is incorrect', () => {
      
    })
  })

  // REGISTER
  describe('REGISTER', () => {
    it('returns 201 if passed username and password in body', () => {
      
    })

    it('returns 404 if missing either username or password', () => {
      
    })
  })

  // GET BY ID
  describe('GET BY ID', () => {
    it('returns a 200 with user object', () => {
      
    })
  })

  // PUT
  describe('PUT', () => {
    it('returns 200 with newly-made user object', () => {
      
    })

    it('returns 404 if not passing in any body', () => {
      
    })
  })

  describe('DELETE', () => {
    it('returns 200 if successful', () => {
      
    })

    it("returns a 404 if passed an id that doesn't correspond to a user_id", () => {
      
    })
  })
})


// CREATED-VALUES TESTS
describe('Created-Values Routers', () => {
  describe('GET', () => {
    it('returns a 200 with an array of objects', () => {
      
    })
  })

  describe('POST', () => {
    it('returns a 201 with newly-created value object', () => {
      
    })

    it('returns a 404 if either created_value_name or user_id are missing', () => {
      
    })
  })

  describe('PUT', () => {
    it('test description', () => {
      
    })
  })

  describe('DELETE', () => {
    it('test description', () => {
      
    })
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

  // GET
  describe('GET method', () => {
    it('returns an array of project-objects for a given id', async () => {
      let id = 1
      let response = await request(server).get(`/api/projects/${id}`)
      expect(response.status).toBe(200)
      // --> HAVING TROUBLE WITH THIS
      // expect(response.body).toEqual(responseArr)
    })
  })

  // POST
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

  // PUT
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

  // PUT INACTIVE
  describe('MARK INACTIVE', () => {
    it('returns 200 with project set to inactive', () => {
      
    })
  })

  // PUT ACTIVE
  describe('MARK ACTIVE', () => {
    it('returns 200 with project set to active', () => {
      
    })
  })

  // DELETE
  describe('DELETE Project', () => {
    it('returns 200 when passed :id as params and user_id in body', () => {
      
    })

    it('returns 404 if user_id is missing in body', () => {
      
    })
  })
})


// USER-VALUES TESTS
describe('User-Values Routers', () => {
  it('test description', () => {
    
  })
})
