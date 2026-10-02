function NovoUsuarioComponent({ novoUsuario, onFechar }) {
    return (
        <div className="novo-usuario">
            <div>
                <strong>Usuário cadastrado com sucesso!</strong>
                <p>
                    {novoUsuario.name} (@{novoUsuario.username}) foi adicionado ao topo da lista.
                </p>
            </div>
            <button className="btn btn-pequeno btn-claro" onClick={onFechar}>
                OK
            </button>
        </div>
    );
}

export default NovoUsuarioComponent;