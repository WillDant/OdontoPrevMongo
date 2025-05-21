console.log('main.js loaded');

// Utilitário para exclusão com modal
let deleteAction = null;
let deleteModal = null;

function abrirModalExclusao(callback) {
  deleteAction = callback;
  if (!deleteModal) {
    deleteModal = new bootstrap.Modal(document.getElementById('modalConfirmDelete'));
  }
  deleteModal.show();
}

document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('btnConfirmDelete');
  if (btn) {
    btn.onclick = async function() {
      if (typeof deleteAction === 'function') {
        await deleteAction();
      }
      if (deleteModal) {
        deleteModal.hide();
      }
    };
  }
});

// === PACIENTES ===
async function carregarPacientes() {
    const res = await fetch('/pacientes');
    const dados = await res.json();
    const tabela = document.getElementById('tabelaPacientes');
    tabela.style.display = 'table';
    
    // Limpa a tabela atual se existir
    if ($.fn.DataTable.isDataTable('#tabelaPacientes')) {
        $('#tabelaPacientes').DataTable().destroy();
    }
    
    // Preenche a tabela com os dados
    tabela.innerHTML = `
        <thead>
            <tr>
                <th>Nome</th>
                <th>Idade</th>
                <th>Sexo</th>
                <th>Plano</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Preventivo</th>
                <th>Curativo</th>
                <th>Score</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            ${dados.map(p => `
                <tr>
                    <td>${p.nome}</td>
                    <td>${p.idade}</td>
                    <td>${p.sexo}</td>
                    <td>${p.plano}</td>
                    <td>${p.cidade || ''}</td>
                    <td>${p.estado || ''}</td>
                    <td>${p.possui_trat_preventivo ? 'Sim' : 'Não'}</td>
                    <td>${p.possui_trat_curativo ? 'Sim' : 'Não'}</td>
                    <td>${p.score_risco ?? ''}</td>
                    <td>
                        <div class="acoes-tabela">
                            <button onclick="editarPaciente('${p._id}')" class="btn btn-sm btn-primary">Editar</button>
                            <button onclick="deletarPaciente('${p._id}')" class="btn btn-sm btn-danger">Excluir</button>
                        </div>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;

    // Remove mensagem de carregamento
    document.getElementById('outputPacientes').textContent = '';

    // Inicializa o DataTables
    $(tabela).DataTable({
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.13.7/i18n/pt-BR.json'
        },
        order: [[0, 'asc']],
        dom: "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
             "<'row'<'col-sm-12'tr>>" +
             "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        scrollX: true,
        scrollCollapse: true,
        paging: true,
        searching: true,
        info: true,
        ordering: true,
        autoWidth: false,
        pageLength: 10,
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
        columnDefs: [
            {
                targets: -1,
                orderable: false,
                className: 'text-center',
                searchable: false
            }
        ]
    });
}
document.getElementById('formPaciente').addEventListener('submit', async e => {
    e.preventDefault();
    const paciente = {
      nome: nome.value,
      idade: parseInt(idade.value),
      sexo: sexo.value,
      plano: plano.value,
      cidade: cidade.value,
      estado: estado.value,
      possui_trat_preventivo: possui_trat_preventivo.value === 'true',
      possui_trat_curativo: possui_trat_curativo.value === 'true',
      score_risco: score_risco.value ? parseFloat(score_risco.value) : undefined
    };
    const id = e.target.dataset.id;
    const url = id ? `/pacientes/${id}` : '/pacientes';
    const method = id ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(paciente) });
    e.target.reset(); delete e.target.dataset.id; carregarPacientes();
});
async function editarPaciente(id) {
    const p = await (await fetch(`/pacientes/${id}`)).json();
    nome.value = p.nome; idade.value = p.idade; sexo.value = p.sexo; plano.value = p.plano;
    cidade.value = p.cidade || '';
    estado.value = p.estado || '';
    possui_trat_preventivo.value = String(!!p.possui_trat_preventivo);
    possui_trat_curativo.value = String(!!p.possui_trat_curativo);
    score_risco.value = p.score_risco ?? '';
    // Não exibe nem manipula campo ID no formulário, apenas armazena no dataset para update
    document.getElementById('formPaciente').dataset.id = p._id;
}
async function deletarPaciente(id) {
  abrirModalExclusao(async () => {
    await fetch(`/pacientes/${id}`, { method: 'DELETE' });
    carregarPacientes();
  });
}

// === CONSULTAS ===
async function carregarConsultas() {
    const res = await fetch('/consultas');
    const dados = await res.json();
    const out = document.getElementById('outputConsultas');
    out.innerHTML = `
      <table class="json-output-table display nowrap" id="tabelaConsultas">
        <thead>
          <tr>
            <th>ID Paciente</th>
            <th>Dentista</th>
            <th>Especialidade</th>
            <th>Data</th>
            <th>Tipo</th>
            <th>Observações</th>
            <th>Realizada</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          ${dados.map(c => `
            <tr>
              <td>${c.pacienteId}</td>
              <td>${c.dentista}</td>
              <td>${c.especialidade || ''}</td>
              <td>${c.data ? c.data.slice(0,10) : ''}</td>
              <td>${c.tipo_consulta}</td>
              <td>${c.observacoes || ''}</td>
              <td>${c.realizada ? 'Sim' : 'Não'}</td>
              <td>
                <div class="acoes-tabela">
                  <button onclick="editarConsulta('${c._id}')" class="btn btn-sm btn-primary">Editar</button>
                  <button onclick="deletarConsulta('${c._id}')" class="btn btn-sm btn-danger">Excluir</button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    aplicarDataTables();
}
document.getElementById('formConsulta').addEventListener('submit', async e => {
    e.preventDefault();
    const consulta = {
      pacienteId: pacienteConsulta.value,
      dentista: dentistaId.value,
      especialidade: especialidade.value,
      data: dataConsulta.value ? new Date(dataConsulta.value).toISOString() : undefined,
      tipo_consulta: tipoConsulta.value,
      observacoes: observacoes.value,
      realizada: realizada.value === 'true'
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
    especialidade.value = c.especialidade || '';
    dataConsulta.value = c.data ? c.data.slice(0,10) : '';
    tipoConsulta.value = c.tipo_consulta;
    observacoes.value = c.observacoes || '';
    realizada.value = String(!!c.realizada);
    document.getElementById('formConsulta').dataset.id = c._id;
}
async function deletarConsulta(id) {
  abrirModalExclusao(async () => {
    await fetch(`/consultas/${id}`, { method: 'DELETE' });
    carregarConsultas();
  });
}

// === TRATAMENTOS ===
async function carregarTratamentos() {
    const res = await fetch('/tratamentos');
    const dados = await res.json();
    const out = document.getElementById('outputTratamentos');
    out.innerHTML = `
      <table class="json-output-table display nowrap" id="tabelaTratamentos">
        <thead>
          <tr>
            <th>ID Paciente</th>
            <th>Tipo</th>
            <th>Profissional</th>
            <th>Data Início</th>
            <th>Custo</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          ${dados.map(t => `
            <tr>
              <td>${t.pacienteId}</td>
              <td>${t.tipo_tratamento}</td>
              <td>${t.profissional_responsavel}</td>
              <td>${t.data_inicio ? t.data_inicio.slice(0,10) : ''}</td>
              <td>${t.custo_estimado}</td>
              <td>${t.status}</td>
              <td>
                <div class="acoes-tabela">
                  <button onclick="editarTratamento('${t._id}')" class="btn btn-sm btn-primary">Editar</button>
                  <button onclick="deletarTratamento('${t._id}')" class="btn btn-sm btn-danger">Excluir</button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    aplicarDataTables();
}
document.getElementById('formTratamento').addEventListener('submit', async e => {
    e.preventDefault();
    const t = {
      pacienteId: pacienteTratamento.value,
      tipo_tratamento: tipoTratamento.value,
      profissional_responsavel: profissional_responsavel.value,
      data_inicio: dataTratamento.value ? new Date(dataTratamento.value).toISOString() : undefined,
      custo_estimado: custoEstimado.value ? parseFloat(custoEstimado.value) : undefined,
      status: status.value
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
    tipoTratamento.value = t.tipo_tratamento;
    profissional_responsavel.value = t.profissional_responsavel;
    dataTratamento.value = t.data_inicio ? t.data_inicio.slice(0,10) : '';
    data_fim.value = t.data_fim ? t.data_fim.slice(0,10) : '';
    custoEstimado.value = t.custo_estimado;
    status.value = t.status;
    document.getElementById('formTratamento').dataset.id = t._id;
}
async function deletarTratamento(id) {
  abrirModalExclusao(async () => {
    await fetch(`/tratamentos/${id}`, { method: 'DELETE' });
    carregarTratamentos();
  });
}

// === INCENTIVOS ===
async function carregarIncentivos() {
    const res = await fetch('/incentivos');
    const dados = await res.json();
    const out = document.getElementById('outputIncentivos');
    out.innerHTML = `
      <table class="json-output-table" id="tabelaIncentivos">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Pontos</th>
            <th>Ativo</th>
            <th>Início</th>
            <th>Fim</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          ${dados.map(i => `
            <tr>
              <td>${i._id}</td>
              <td>${i.titulo}</td>
              <td>${i.descricao || ''}</td>
              <td>${i.pontos_recompensa}</td>
              <td>${i.ativo ? 'Sim' : 'Não'}</td>
              <td>${i.data_inicio ? i.data_inicio.slice(0,10) : ''}</td>
              <td>${i.data_fim ? i.data_fim.slice(0,10) : ''}</td>
              <td>
                <div class="acoes-tabela">
                  <button onclick="editarIncentivo('${i._id}')" class="btn btn-sm btn-primary">Editar</button>
                  <button onclick="deletarIncentivo('${i._id}')" class="btn btn-sm btn-danger">Excluir</button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    aplicarDataTables();
}
document.getElementById('formIncentivo').addEventListener('submit', async e => {
    e.preventDefault();
    const incentivo = {
      titulo: tituloIncentivo.value,
      descricao: descricaoIncentivo.value,
      pontos_recompensa: parseInt(pontosRecompensa.value),
      ativo: ativo.value === 'true',
      data_inicio: data_inicio_incentivo.value ? new Date(data_inicio_incentivo.value).toISOString() : undefined,
      data_fim: data_fim_incentivo.value ? new Date(data_fim_incentivo.value).toISOString() : undefined
    };
    const id = e.target.dataset.id;
    const url = id ? `/incentivos/${id}` : '/incentivos';
    const method = id ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(incentivo) });
    e.target.reset(); delete e.target.dataset.id; carregarIncentivos();
});
async function editarIncentivo(id) {
    const i = await (await fetch(`/incentivos/${id}`)).json();
    tituloIncentivo.value = i.titulo;
    descricaoIncentivo.value = i.descricao || '';
    pontosRecompensa.value = i.pontos_recompensa;
    ativo.value = String(!!i.ativo);
    data_inicio_incentivo.value = i.data_inicio ? i.data_inicio.slice(0,10) : '';
    data_fim_incentivo.value = i.data_fim ? i.data_fim.slice(0,10) : '';
    document.getElementById('formIncentivo').dataset.id = i._id;
}
async function deletarIncentivo(id) {
  abrirModalExclusao(async () => {
    await fetch(`/incentivos/${id}`, { method: 'DELETE' });
    carregarIncentivos();
  });
}

// === GAMIFICAÇÃO ===
async function carregarGamificacao() {
    const res = await fetch('/gamificacao');
    const dados = await res.json();
    const out = document.getElementById('outputGamificacao');
    out.innerHTML = `
      <table class="json-output-table" id="tabelaGamificacao">
        <thead>
          <tr>
            <th>ID Paciente</th>
            <th>Desafio</th>
            <th>Concluído</th>
            <th>Pontos Ganhos</th>
            <th>Data de Conclusão</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          ${dados.map(g => `
            <tr>
              <td>${g.pacienteId}</td>
              <td>${g.desafio}</td>
              <td>${g.concluido ? 'Sim' : 'Não'}</td>
              <td>${g.pontos_ganhos}</td>
              <td>${g.data_conclusao ? g.data_conclusao.slice(0,10) : ''}</td>
              <td>
                <div class="acoes-tabela">
                  <button onclick="editarGamificacao('${g._id}')" class="btn btn-sm btn-primary">Editar</button>
                  <button onclick="deletarGamificacao('${g._id}')" class="btn btn-sm btn-danger">Excluir</button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    aplicarDataTables();
}
document.getElementById('formGamificacao').addEventListener('submit', async e => {
    e.preventDefault();
    const gamificacao = {
      pacienteId: pacienteGamificacao.value,
      desafio: desafio.value,
      concluido: concluido.value === 'true',
      pontos_ganhos: parseInt(pontos_ganhos.value),
      data_conclusao: data_conclusao.value ? new Date(data_conclusao.value).toISOString() : undefined
    };
    const id = e.target.dataset.id;
    const url = id ? `/gamificacao/${id}` : '/gamificacao';
    const method = id ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(gamificacao) });
    e.target.reset(); delete e.target.dataset.id; carregarGamificacao();
});
async function editarGamificacao(id) {
    const g = await (await fetch(`/gamificacao/${id}`)).json();
    pacienteGamificacao.value = g.pacienteId;
    desafio.value = g.desafio;
    concluido.value = String(!!g.concluido);
    pontos_ganhos.value = g.pontos_ganhos;
    data_conclusao.value = g.data_conclusao ? g.data_conclusao.slice(0,10) : '';
    document.getElementById('formGamificacao').dataset.id = g._id;
}
async function deletarGamificacao(id) {
  abrirModalExclusao(async () => {
    await fetch(`/gamificacao/${id}`, { method: 'DELETE' });
    carregarGamificacao();
  });
}

// === DOCUMENTOS ===
async function carregarDocumentos() {
    const res = await fetch('/documentos');
    const dados = await res.json();
    const out = document.getElementById('outputDocumentos');
    out.innerHTML = `
      <table class="json-output-table" id="tabelaDocumentos">
        <thead>
          <tr>
            <th>ID Paciente</th>
            <th>Tipo de Documento</th>
            <th>URL do Arquivo</th>
            <th>Descrição</th>
            <th>Data de Upload</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          ${dados.map(d => `
            <tr>
              <td>${d.pacienteId}</td>
              <td>${d.tipo_documento}</td>
              <td>${d.url_arquivo}</td>
              <td>${d.descricao}</td>
              <td>${d.data_upload ? d.data_upload.slice(0,10) : ''}</td>
              <td>
                <div class="acoes-tabela">
                  <button onclick="editarDocumento('${d._id}')" class="btn btn-sm btn-primary">Editar</button>
                  <button onclick="deletarDocumento('${d._id}')" class="btn btn-sm btn-danger">Excluir</button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    aplicarDataTables();
}
document.getElementById('formDocumento').addEventListener('submit', async e => {
    e.preventDefault();
    const documento = {
      pacienteId: pacienteDocumento.value,
      tipo_documento: tipo_documento.value,
      url_arquivo: url_arquivo.value,
      descricao: descricaoDocumento.value,
      data_upload: data_upload.value ? new Date(data_upload.value).toISOString() : undefined
    };
    const id = e.target.dataset.id;
    const url = id ? `/documentos/${id}` : '/documentos';
    const method = id ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(documento) });
    e.target.reset(); delete e.target.dataset.id; carregarDocumentos();
});
async function editarDocumento(id) {
    const d = await (await fetch(`/documentos/${id}`)).json();
    pacienteDocumento.value = d.pacienteId;
    tipo_documento.value = d.tipo_documento;
    url_arquivo.value = d.url_arquivo;
    descricaoDocumento.value = d.descricao || '';
    data_upload.value = d.data_upload ? d.data_upload.slice(0,10) : '';
    document.getElementById('formDocumento').dataset.id = d._id;
}
async function deletarDocumento(id) {
  abrirModalExclusao(async () => {
    await fetch(`/documentos/${id}`, { method: 'DELETE' });
    carregarDocumentos();
  });
}

// Corrige DataTables: NÃO use render para coluna de ações, apenas para conteúdo longo
function aplicarDataTables() {
  $(function() {
    [
      '#tabelaPacientes',
      '#tabelaConsultas',
      '#tabelaTratamentos',
      '#tabelaIncentivos',
      '#tabelaGamificacao',
      '#tabelaDocumentos'
    ].forEach(function(id) {
      if ($(id).length && !$.fn.dataTable.isDataTable(id)) {
        $(id).DataTable({
          language: {
            url: 'https://cdn.datatables.net/plug-ins/1.13.7/i18n/pt-BR.json'
          },
          dom: "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
               "<'row'<'col-sm-12'tr>>" +
               "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
          scrollX: true,
          scrollCollapse: true,
          paging: true,
          searching: true,
          info: true,
          ordering: true,
          autoWidth: false,
          pageLength: 10,
          lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
          columnDefs: [
            {
              targets: -1, // Última coluna (Ações)
              orderable: false,
              className: 'text-center',
              searchable: false
            },
            {
              targets: '_all',
              render: function(data, type, row, meta) {
                if (meta.col !== row.length - 1 && type === 'display' && data != null && typeof data === 'string' && data.length > 50) {
                  return '<span class="long-content" title="' + data + '">' + data.substr(0, 50) + '...</span>';
                }
                return data;
              }
            }
          ],
          drawCallback: function() {
            $('.long-content').on('click', function() {
              alert($(this).attr('title'));
            });
          }
        });
      }
    });
  });
}

// === Inicialização ===
carregarPacientes();
carregarConsultas();
carregarTratamentos();
carregarIncentivos();
carregarGamificacao();
carregarDocumentos();
