function UserCardComponent({ usuario, onSelecionarUsuario, onExcluirUsuario }) {
    return (
        <article className="card">
            <div className="card-avatar">
                {usuario.name.charAt(0).toUpperCase()}
            </div>

            <div className="card-info">
                <h3>{usuario.name}</h3>
                <p className="card-username">@{usuario.username}</p>
                <p className="card-email">{usuario.email}</p>
            </div>

            <div className="card-acoes">
                <button
                    className="btn btn-primario btn-pequeno"
                    onClick={() => onSelecionarUsuario(usuario.id)}
                >
                    Detalhes
                </button>
                <button
                    className="btn btn-perigo btn-pequeno"
                    onClick={() => onExcluirUsuario(usuario.id)}
                >
                    Excluir
                </button>
            </div>
        </article>
    );
}

export default UserCardComponent;