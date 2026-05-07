-- Inserts de teste apenas para a tabela tarefas
INSERT INTO tarefas (descricao, finalizado, arquivo, created_at, updated_at)
VALUES
  ('Comprar pao e leite', false, null, NOW(), NOW()),
  ('Estudar Node e React', true, null, NOW(), NOW()),
  ('Organizar backlog da sprint', false, null, NOW(), NOW()),
  ('Revisar pull requests', true, null, NOW(), NOW());
