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
