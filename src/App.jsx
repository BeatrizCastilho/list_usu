import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import LoadingComponent from "./components/LoadingComponent";
import UserListComponent from "./components/UserListComponent";
import UserDetailsComponent from "./components/UserDetailsComponent";
import UserForm from "./components/UserForm";
import NovoUsuarioComponent from "./components/NovoUsuarioComponent";
import ModalComponent from "./components/ModalComponent";

const URL_API = "https://jsonplaceholder.typicode.com";

// Retorna uma função que diz se o usuário combina com o termo buscado
const filtrarUsuarioPorTermo = (termo) => (usuario) => {
    const termoLower = termo.toLowerCase();
    return (
        usuario.name.toLowerCase().includes(termoLower) ||
        usuario.username.toLowerCase().includes(termoLower) ||
        usuario.email.toLowerCase().includes(termoLower)
    );
};

function App() {
    const [usuarios, setUsuarios] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);                 // erro ao carregar a lista
    const [erroCadastro, setErroCadastro] = useState(null); // erro ao cadastrar
    const [busca, setBusca] = useState("");
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [novoUsuario, setNovoUsuario] = useState(null);

    const usuariosFiltrados = usuarios.filter(filtrarUsuarioPorTermo(busca));

    // GET /users -> carrega a lista inicial
    async function buscarUsuarios() {
        try {
            setCarregando(true);
            setErro(null);
            const response = await axios.get(`${URL_API}/users`);
            setUsuarios(response.data);
        } catch (error) {
            console.log("Erro ao buscar usuários: ", error);
            setErro(`Não foi possível carregar os usuários. Código: ${error.message}`);
            setUsuarios([]);
        } finally {
            setCarregando(false);
        }
    }

    // GET /users/:id -> abre o modal com os detalhes
    async function buscarUsuario(id) {
        // Usuários cadastrados por você só existem aqui (a API é fake),
        // então não dá para buscá-los no servidor
        const usuarioLocal = usuarios.find((u) => u.id === id && u.local);
        if (usuarioLocal) {
            setUsuarioSelecionado(usuarioLocal);
            return;
        }

        try {
            const response = await axios.get(`${URL_API}/users/${id}`);
            setUsuarioSelecionado(response.data);
        } catch (error) {
            console.log("Erro ao buscar usuário: ", error);
        }
    }

    function limparDetalhesUsuario() {
        setUsuarioSelecionado(null);
    }

    // POST /users -> cadastra
    async function cadastrarUsuario(usuario) {
        try {
            setErroCadastro(null);
            const response = await axios.post(`${URL_API}/users`, usuario);

            // A API fake devolve sempre id 11, então geramos um id único
            const data = { ...response.data, id: Date.now(), local: true };

            setNovoUsuario(data);
            setUsuarios((atuais) => [data, ...atuais]);
        } catch (error) {
            console.log("Erro ao cadastrar usuário: ", error);
            setErroCadastro("Não foi possível cadastrar o usuário.");
        }
    }

    // Exclui um usuário (só no estado, pois a API fake não apaga de verdade)
    function excluirUsuario(id) {
        if (!window.confirm("Deseja excluir este usuário?")) return;

        setUsuarios((atuais) => atuais.filter((u) => u.id !== id));

        if (usuarioSelecionado?.id === id) setUsuarioSelecionado(null);
        if (novoUsuario?.id === id) setNovoUsuario(null);
    }

    // Exclui todos de uma vez
    function excluirTodos() {
        if (usuarios.length === 0) return;
        if (!window.confirm("Deseja excluir TODOS os usuários?")) return;

        setUsuarios([]);
        setUsuarioSelecionado(null);
        setNovoUsuario(null);
    }

    // Roda uma vez, quando o app abre
    useEffect(() => {
        buscarUsuarios();
    }, []);

    return (
        <div className="app">
            <HeaderComponent busca={busca} setBusca={setBusca} />

            {carregando && <LoadingComponent />}

            {erro && <p className="erro">{erro}</p>}

            {!carregando && !erro && (
                <>
                    <div className="barra-lista">
                        <p className="informacao">
                            {usuariosFiltrados.length} usuário(s) encontrado(s)
                        </p>
                        <button
                            className="btn btn-perigo"
                            onClick={excluirTodos}
                            disabled={usuarios.length === 0}
                        >
                            Excluir todos
                        </button>
                    </div>

                    {usuariosFiltrados.length > 0 ? (
                        <UserListComponent
                            usuarios={usuariosFiltrados}
                            onSelecionarUsuario={buscarUsuario}
                            onExcluirUsuario={excluirUsuario}
                        />
                    ) : (
                        <p className="sem-resultados">Nenhum usuário encontrado.</p>
                    )}
                </>
            )}

            {/* O cadastro fica fora do bloco acima: funciona mesmo se a lista falhar */}
            <UserForm onCadastrar={cadastrarUsuario} />

            {erroCadastro && <p className="erro">{erroCadastro}</p>}

            {novoUsuario && (
                <NovoUsuarioComponent
                    novoUsuario={novoUsuario}
                    onFechar={() => setNovoUsuario(null)}
                />
            )}

            {usuarioSelecionado && (
                <ModalComponent onFechar={limparDetalhesUsuario}>
                    <UserDetailsComponent
                        usuario={usuarioSelecionado}
                        onFecharDetalhes={limparDetalhesUsuario}
                    />
                </ModalComponent>
            )}
        </div>
    );
}

export default App;