# Todos:

## Admin/Debug CLI tool
- [x] Remove conflicting `@byndr/import-tools` **lib**
- [x] Rename `import-tools` app to `@byndr/import-tools`
- [x] Implement parser for tcg player exports (list previous implementation where posible)
- [x] Create `list-entry` entities and schema
- [ ] Wire up parser results to save as list entries belonging to a list
- [ ] Write e2e tests for...
	- [ ] `byndr list:create`
	- [ ] `byndr list:import`

## E2E testing envs
- [x] Setup `byndr_test_db`(postgres), `byndr_test_redis` (redis) containers
  - [x] Extending docker-compose.yml at root to create a test stack for `@byndr/import-tools-e2e`
  - [ ] Add docker-compose setup script to the `@byndr/import-tools-e2e:test` target
  - [ ] Add docker-compose TEARDOWN script to the `@byndr/import-tools-e2e:test` target
  - [ ] Add injection of test `.env` vars to `@byndr/db-client`
- [ ] Create a POC green test that you can run the help CLI help command
- [ ] Update DB libs to support a override for .env
- [ ] 
