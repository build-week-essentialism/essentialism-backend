exports.seed = function(knex) {
  return knex('user-values').insert([
    {
      user_id: 1,
      default_value_id: 1,
      value_rank: 1,
      value_importance: 'I love sports.'
    },
    {
      user_id: 1,
      created_value_id: 1,
      value_rank: 2,
      value_importance: 'You gotta let it out.'
    },
    {
      user_id: 1,
      created_value_id: 2,
      value_importance:
        'I used to go hiking with my dad. Getting out in nature reminds me of him.'
    },
    {
      user_id: 1,
      default_value_id: 8,
      value_rank: 3,
      value_importance: "I've always loved music."
    },
    {
      user_id: 2,
      default_value_id: 5
    },
    {
      user_id: 2,
      created_value_id: 3,
      value_rank: 2,
      value_importance: 'If you stick to it, things will work out.'
    },
    {
      user_id: 2,
      created_value_id: 4,
      value_rank: 1,
      value_importance: 'I just want to stay in shape. I feel better when I do.'
    },
    {
      user_id: 2,
      default_value_id: 10
    },
    {
      user_id: 2,
      created_value_id: 5,
      value_rank: 3,
      value_importance:
        "I don't know - I guess I just like some odd things that I want people to ask me about."
    },
    {
      user_id: 3,
      default_value_id: 9,
      value_rank: 2,
      value_importance:
        'Me and my family try to stay involved in the community.'
    },
    {
      user_id: 3,
      created_value_id: 6
    },
    {
      user_id: 3,
      created_value_id: 7
    },
    {
      user_id: 3,
      created_value_id: 8
    },
    {
      user_id: 3,
      default_value_id: 12,
      value_rank: 1,
      value_importance: 'Family comes first, then friends, then everyting else.'
    },
    {
      user_id: 3,
      default_value_id: 14,
      value_rank: 3,
      value_importance: 'My career is important to me, so I want to succeed.'
    }
  ]);
};
