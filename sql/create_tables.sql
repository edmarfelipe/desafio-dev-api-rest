create table if not exists pessoas (
  "idPessoa" serial not null primary key,
  "nome" varchar(100) not null,
  "cpf" CHAR(11)not null,
  "dataNascimento" date not null
);

create table if not exists contas (
  "idConta" serial not null primary key,
  "idPessoa" integer not null references pessoas,
  "saldo" decimal(12,2) not null,
  "limiteSaqueDiario" decimal(12,2),
  "flagAtivo" boolean default true,
  "dataCriacao" timestamp not null
);

create table if not exists transacoes (
  "idTransacao" serial not null primary key,
  "idConta" integer not null references contas,
  "valor" decimal(12,2) not null,
  "dataTransacao" timestamp not null
);


