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

// DEFAULT-VALUES TESTS
describe('Default-Values Routers', () => {
  it('test description', async () => {
    let response = await request(server).get('/api/defaultvalues')
    expect(response.status).toBe(200)
    expect(response.body).toEqual(defaultValuesArr)
  })
})


// PROJECTS TESTS
describe('Projects Routers', () => {
  it('get the default values and returns a 200', () => {
    
  })
})


// USER-VALUES TESTS
describe('User-Values Routers', () => {
  it('test description', () => {
    
  })
})
