include .env
export

build: 
	docker compose up --build

start:
	docker compose up

stop:
	docker compose down

sh:
	docker compose run --rm web /bin/bash

rails:
	docker compose exec web bundle exec rails c

db.migrate:
	docker compose run --rm web bundle exec rake db:migrate
	
db.rollback:
	docker compose run --rm web bundle exec rake db:rollback

db.prep:
	docker compose run --rm web sh -c 'bundle exec rake --backtrace=stderr db:environment:set RAILS_ENV=development 2>/dev/null; bundle exec rake db:drop db:create'	

db.dump:
	docker compose exec -T db pg_dump -U postgres familymeal_development \
	| gzip -c > snapshot-familymeal.sql.gz

db.load:
	docker compose exec db \
	  psql -U postgres -c "DROP DATABASE IF EXISTS familymeal_development;"
	docker compose exec db \
	  psql -U postgres -c "CREATE DATABASE familymeal_development;"
	gunzip -c snapshot-familymeal.sql.gz \
	| docker compose exec -T db \
	  psql -U postgres -d familymeal_development

db.c:
	docker compose exec db psql -U postgres -d familymeal_development

db.seed:
	docker compose run --rm web bundle exec rails db:seed

db.dev.push:
	gunzip -c snapshot-familymeal.sql.gz \
  	| sed '/^\\restrict/d;/^\\unrestrict/d' \
  	| psql "$(NEON_DB_URL)"