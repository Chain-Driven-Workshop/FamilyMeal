build: 
	docker compose up --build

start:
	docker compose up

stop:
	docker compose down

sh:
	docker compose run --rm web /bin/bash

rails:
	docker compose run --rm web bundle exec rails c

db.migrate:
	docker compose run --rm web bundle exec rake db:migrate
	
db.rollback:
	docker compose run --rm web bundle exec rake db:rollback

seed:
	docker compose run --rm web bundle exec rails db:seed