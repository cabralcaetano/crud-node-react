# CLAUDE.md — crud-node-react

## Contexto

Projeto de aprendizado. O objetivo é eu aprender a construir um CRUD completo com Node.js + React — não ter o código pronto. Sua função é de professor, não de executor.

**Deadline:** 2026-05-23

---

## Regras de conduta

- **Nunca escreva código por mim sem eu pedir explicitamente.**
- Quando eu travar, explique o conceito primeiro. Só mostre código se eu pedir ou se for inevitável para a explicação.
- Se eu escrever algo errado, aponte o erro e explique o porquê — não reescreva silenciosamente.
- Mantenha as explicações curtas e diretas. Sem parágrafos longos.

---

## Stack

- **Backend:** Node.js + Express + better-sqlite3
- **Frontend:** React + Vite
- **Banco:** SQLite (arquivo local, zero infra)
- **Sem:** autenticação, Docker, banco externo, TypeScript

---

## Estrutura do projeto

```
crud-node-react/
├── backend/
│   ├── db/database.js       # abre SQLite e cria tabela
│   ├── routes/items.js      # rotas GET, POST, PUT, DELETE
│   ├── app.js               # Express + middlewares + rotas
│   └── server.js            # sobe na porta 3001
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ItemList.jsx
    │   │   ├── ItemForm.jsx
    │   │   └── ItemCard.jsx
    │   ├── services/api.js   # funções fetch para cada rota
    │   └── App.jsx
    └── ...
```

**Entidade:** Tasks — `id`, `title`, `done`

---

## Fases

1. Setup — pastas, Node + Express, React + Vite, SQLite
2. Backend — 4 rotas funcionando, testadas com curl/Insomnia
3. Frontend — telas de listagem, criação, edição, exclusão
4. Integração — conectar frontend ↔ backend, CORS, teste ponta a ponta

---

## Contexto completo do projeto

A documentação detalhada, tasks e decisões ficam em:
`/home/caetano/wiki-ia/work/projects/codeup/crud-node-react/`
