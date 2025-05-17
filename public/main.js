console.log('main.js loaded');
// === PACIENTES ===
async function carregarPacientes() {
    const res = await fetch('/pacientes');
    const dados = await res.json();
    const out = document.getElementById('outputPacientes');
    out.innerHTML = '';
    dados.forEach(p => {
      out.innerHTML += `<div class="d-flex justify-content-between">
        <span>${p.nome} - ${p.idade} anos (${p.sexo}) [${p.plano}]</span>
        <span>
          <button onclick="editarPaciente('${p._id}')" class="btn btn-sm btn-primary">Editar</button>
          <button onclick="deletarPaciente('${p._id}')" class="btn btn-sm btn-danger">Excluir</button>
        </span></div>`;
    });
  }
  document.getElementById('formPaciente').addEventListener('submit', async e => {
    e.preventDefault();
    const paciente = { nome: nome.value, idade: idade.value, sexo: sexo.value, plano: plano.value };
    const id = e.target.dataset.id;
    const url = id ? `/pacientes/${id}` : '/pacientes';
    const method = id ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(paciente) });
    e.target.reset(); delete e.target.dataset.id; carregarPacientes();
  });
  async function editarPaciente(id) {
    const p = await (await fetch(`/pacientes/${id}`)).json();
    nome.value = p.nome; idade.value = p.idade; sexo.value = p.sexo; plano.value = p.plano;
    document.getElementById('formPaciente').dataset.id = p._id;
  }
  async function deletarPaciente(id) {
    if (confirm('Excluir paciente?')) await fetch(`/pacientes/${id}`, { method: 'DELETE' }), carregarPacientes();
  }
  
  // === CONSULTAS ===
  async function carregarConsultas() {
    const res = await fetch('/consultas');
    const dados = await res.json();
    const out = document.getElementById('outputConsultas');
    out.innerHTML = '';
    dados.forEach(c => {
      out.innerHTML += `<div class="d-flex justify-content-between">
        <span>${c.pacienteId} - ${c.tipoConsulta} (${c.dataConsulta?.slice(0,10)})</span>
        <span>
          <button onclick="editarConsulta('${c._id}')" class="btn btn-sm btn-primary">Editar</button>
          <button onclick="deletarConsulta('${c._id}')" class="btn btn-sm btn-danger">Excluir</button>
        </span></div>`;
    });
  }
  document.getElementById('formConsulta').addEventListener('submit', async e => {
    e.preventDefault();
    const consulta = {
      pacienteId: pacienteConsulta.value,
      dentista: dentistaId.value,
      dataConsulta: dataConsulta.value,
      tipoConsulta: tipoConsulta.value
    };
    const id = e.target.dataset.id;
    const url = id ? `/consultas/${id}` : '/consultas';
    const method = id ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(consulta) });
    e.target.reset(); delete e.target.dataset.id; carregarConsultas();
  });
  async function editarConsulta(id) {
    const c = await (await fetch(`/consultas/${id}`)).json();
    pacienteConsulta.value = c.pacienteId;
    dentistaId.value = c.dentista;
    dataConsulta.value = c.dataConsulta?.slice(0,10);
    tipoConsulta.value = c.tipoConsulta;
    document.getElementById('formConsulta').dataset.id = c._id;
  }
  async function deletarConsulta(id) {
    if (confirm('Excluir consulta?')) await fetch(`/consultas/${id}`, { method: 'DELETE' }), carregarConsultas();
  }

  // === TRATAMENTOS ===
async function carregarTratamentos() {
    const res = await fetch('/tratamentos');
    const dados = await res.json();
    const out = document.getElementById('outputTratamentos');
    out.innerHTML = '';
    dados.forEach(t => {
      out.innerHTML += `<div class="d-flex justify-content-between">
        <span>${t.descricao} (${t.tipoTratamento}) - R$${t.custoEstimado}</span>
        <span>
          <button onclick="editarTratamento('${t._id}')" class="btn btn-sm btn-primary">Editar</button>
          <button onclick="deletarTratamento('${t._id}')" class="btn btn-sm btn-danger">Excluir</button>
        </span></div>`;
    });
  }
  document.getElementById('formTratamento').addEventListener('submit', async e => {
    e.preventDefault();
    const t = {
      pacienteId: pacienteTratamento.value,
      descricao: descricaoTratamento.value,
      dataTratamento: dataTratamento.value,
      custoEstimado: custoEstimado.value,
      tipoTratamento: tipoTratamento.value
    };
    const id = e.target.dataset.id;
    const url = id ? `/tratamentos/${id}` : '/tratamentos';
    const method = id ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(t) });
    e.target.reset(); delete e.target.dataset.id; carregarTratamentos();
  });
  async function editarTratamento(id) {
    const t = await (await fetch(`/tratamentos/${id}`)).json();
    pacienteTratamento.value = t.pacienteId;
    descricaoTratamento.value = t.descricao;
    dataTratamento.value = t.dataTratamento?.slice(0, 10);
    custoEstimado.value = t.custoEstimado;
    tipoTratamento.value = t.tipoTratamento;
    document.getElementById('formTratamento').dataset.id = t._id;
  }
  async function deletarTratamento(id) {
    if (confirm('Excluir tratamento?')) await fetch(`/tratamentos/${id}`, { method: 'DELETE' }), carregarTratamentos();
  }
  
  // === INCENTIVOS ===
  async function carregarIncentivos() {
    const res = await fetch('/incentivos');
    const dados = await res.json();
    const out = document.getElementById('outputIncentivos');
    out.innerHTML = '';
    dados.forEach(i => {
      out.innerHTML += `<div class="d-flex justify-content-between">
        <span>${i.titulo} - ${i.bonusIncentivo} pts</span>
        <span>
          <button onclick="editarIncentivo('${i._id}')" class="btn btn-sm btn-primary">Editar</button>
          <button onclick="deletarIncentivo('${i._id}')" class="btn btn-sm btn-danger">Excluir</button>
        </span></div>`;
    });
  }
  document.getElementById('formIncentivo').addEventListener('submit', async e => {
    e.preventDefault();
    const i = {
      titulo: tituloIncentivo.value,
      descricao: descricaoIncentivo.value,
      bonusIncentivo: bonusIncentivo.value
    };
    const id = e.target.dataset.id;
    const url = id ? `/incentivos/${id}` : '/incentivos';
    const method = id ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(i) });
    e.target.reset(); delete e.target.dataset.id; carregarIncentivos();
  });
  async function editarIncentivo(id) {
    const i = await (await fetch(`/incentivos/${id}`)).json();
    tituloIncentivo.value = i.titulo;
    descricaoIncentivo.value = i.descricao;
    bonusIncentivo.value = i.bonusIncentivo;
    document.getElementById('formIncentivo').dataset.id = i._id;
  }
  async function deletarIncentivo(id) {
    if (confirm('Excluir incentivo?')) await fetch(`/incentivos/${id}`, { method: 'DELETE' }), carregarIncentivos();
  }
  
  // === GAMIFICAÇÃO ===
  async function carregarGamificacao() {
    const res = await fetch('/gamificacao');
    const dados = await res.json();
    const out = document.getElementById('outputGamificacao');
    out.innerHTML = '';
    dados.forEach(g => {
      out.innerHTML += `<div class="d-flex justify-content-between">
        <span>${g.pacienteId} - ${g.pontosGamificacao} pts</span>
        <span>
          <button onclick="editarGamificacao('${g._id}')" class="btn btn-sm btn-primary">Editar</button>
          <button onclick="deletarGamificacao('${g._id}')" class="btn btn-sm btn-danger">Excluir</button>
        </span></div>`;
    });
  }
  document.getElementById('formGamificacao').addEventListener('submit', async e => {
    e.preventDefault();
    const g = {
      pacienteId: pacienteGamificacao.value,
      pontosGamificacao: pontosGamificacao.value,
      conquistas: conquistasGamificacao.value.split(',')
    };
    const id = e.target.dataset.id;
    const url = id ? `/gamificacao/${id}` : '/gamificacao';
    const method = id ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(g) });
    e.target.reset(); delete e.target.dataset.id; carregarGamificacao();
  });
  async function editarGamificacao(id) {
    const g = await (await fetch(`/gamificacao/${id}`)).json();
    pacienteGamificacao.value = g.pacienteId;
    pontosGamificacao.value = g.pontosGamificacao;
    conquistasGamificacao.value = g.conquistas?.join(',') ?? '';
    document.getElementById('formGamificacao').dataset.id = g._id;
  }
  async function deletarGamificacao(id) {
    if (confirm('Excluir gamificação?')) await fetch(`/gamificacao/${id}`, { method: 'DELETE' }), carregarGamificacao();
  }
  
  // === DOCUMENTOS ===
  async function carregarDocumentos() {
    const res = await fetch('/documentos');
    const dados = await res.json();
    const out = document.getElementById('outputDocumentos');
    out.innerHTML = '';
    dados.forEach(d => {
      out.innerHTML += `<div class="d-flex justify-content-between">
        <span>${d.tipoDocumento} - ${d.urlDocumento}</span>
        <span>
          <button onclick="editarDocumento('${d._id}')" class="btn btn-sm btn-primary">Editar</button>
          <button onclick="deletarDocumento('${d._id}')" class="btn btn-sm btn-danger">Excluir</button>
        </span></div>`;
    });
  }
  document.getElementById('formDocumento').addEventListener('submit', async e => {
    e.preventDefault();
    const doc = {
      pacienteId: pacienteDocumento.value,
      tipoDocumento: tipoDocumento.value,
      urlDocumento: urlDocumento.value
    };
    const id = e.target.dataset.id;
    const url = id ? `/documentos/${id}` : '/documentos';
    const method = id ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(doc) });
    e.target.reset(); delete e.target.dataset.id; carregarDocumentos();
  });
  async function editarDocumento(id) {
    const d = await (await fetch(`/documentos/${id}`)).json();
    pacienteDocumento.value = d.pacienteId;
    tipoDocumento.value = d.tipoDocumento;
    urlDocumento.value = d.urlDocumento;
    document.getElementById('formDocumento').dataset.id = d._id;
  }
  async function deletarDocumento(id) {
    if (confirm('Excluir documento?')) await fetch(`/documentos/${id}`, { method: 'DELETE' }), carregarDocumentos();
  }
  
  // === Inicialização ===
  carregarPacientes();
  carregarConsultas();
  carregarTratamentos();
  carregarIncentivos();
  carregarGamificacao();
  carregarDocumentos();
  