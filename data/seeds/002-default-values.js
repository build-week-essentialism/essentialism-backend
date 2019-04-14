exports.seed = function(knex) {
  return knex('default-values').insert([
    {
      default_value_name: 'Athletic ability'
    },
    {
      default_value_name: 'Art and literature'
    },
    {
      default_value_name:
        'Creativity, discovering, or inventing things to make a difference in the world'
    },
    {
      default_value_name: 'Independence'
    },
    {
      default_value_name: 'Kindness and generosity'
    },
    {
      default_value_name: 'Living in the moment'
    },
    {
      default_value_name:
        'Membership in a social group (such as your community, racial group, or school club)'
    },
    {
      default_value_name: 'Music'
    },
    {
      default_value_name: 'My community'
    },
    {
      default_value_name: 'My moral principles'
    },
    {
      default_value_name: 'Nature and the environment'
    },
    {
      default_value_name: 'Relationships with friends and family'
    },
    {
      default_value_name: 'Sense of humor'
    },
    {
      default_value_name: 'Success in my career'
    }
  ]);
};
