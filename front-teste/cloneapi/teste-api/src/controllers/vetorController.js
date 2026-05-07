const vetor = [
  {
    tarefa: 'teste',
    data: new Date(Date.now()),
    finalizado: true
  },
  {
    tarefa: 'test2',
    data: new Date(Date.now()),
    finalizado: false
  }
];
const normal = (coisasnormais) => {
  return 'normal'
}
const loginEmail = (req, res) => {
  const {variavel, email} = req.params;


  return res.status(200).send({
    type: 'success',
    message: 'deu boa',
    data: normal('normalidade'),
    email: email,
    query: req.query.nome
  });
}

export default {
  loginEmail
}