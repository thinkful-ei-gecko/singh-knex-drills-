TRUNCATE blogful_articles;

INSERT INTO blogful_articles (title, content, date_published)

VALUES
    ('First Article', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', now() - '4 years'::INTERVAL),
    ('Second Article', 'Libero volutpat sed cras ornare arcu. Porttitor leo a diam sollicitudin.',                                                  now() - '3 years'::INTERVAL),
    ('Third Article', 'Gravida cum sociis natoque penatibus et magnis dis. Etiam tempor orci eu lobortis.',                                          now() - '2 years'::INTERVAL),
    ('Fourth Article', 'Amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus et.',                                        now() - '350 days'::INTERVAL),
    ('Fifth Article', 'In fermentum et sollicitudin ac orci phasellus egestas tellus.',                                                              now() - '300 days'::INTERVAL),
    ('Sixth Article', 'Morbi enim nunc faucibus a pellentesque sit amet porttitor.',                                                                 now() - '250 days'::INTERVAL),
    ('Seventh Article', 'Est lorem ipsum dolor sit amet consectetur.',                                                                               now() - '200 days'::INTERVAL),
    ('Eigth Article', 'Aliquam id diam maecenas ultricies mi eget.',                                                                                 now() - '150 days'::INTERVAL),
    ('Ninth Article', 'Aliquam ultrices sagittis orci a.',                                                                                           now() - '100 days'::INTERVAL),
    ('Tenth Article', 'Tristique senectus et netus et malesuada fames.',                                                                            now() - '50 days'::INTERVAL),
    ('Eleventh Article', 'Mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et.',                                          now() - '45 days'::INTERVAL),
    ('Twelfth Article', 'Neque aliquam vestibulum morbi blandit.',                                                                                   now() - '40 days'::INTERVAL),
    ('Thirteenth Article', 'Scelerisque fermentum dui faucibus in ornare quam viverra orci.',                                                        now() - '30 days'::INTERVAL),
    ('Fourteenth Article', 'Dui id ornare arcu odio ut sem nulla pharetra.',                                                                         now() - '20 days'::INTERVAL),
    ('Fifteenth Article', 'Sit amet massa vitae tortor condimentum lacinia qis vel.',                                                                now() - '15 days'::INTERVAL),
    ('Sixteenth Article', 'Nec ultrices dui sapien eget mi proin sed libero.',                                                                       now() - '10 days'::INTERVAL),
    ('Seventeenth Article', 'At lectus urna duis convallis convallis.',                                                                              now() - '5 days'::INTERVAL),
    ('Eighteenth Article', 'Quis commodo odio aenean sed adipiscing diam donec adipiscing.',                                                         now() - '3 days'::INTERVAL),
    ('Nineteenth Article', 'Gravida dictum fusce ut placerat orci nulla.',                                                                           now()),
    ('Twentieth Article', 'Sapien et ligula ullamcorper malesuada proin libero nunc.',                                                               now())
;
