function UserDetailsComponent({ usuario, onFecharDetalhes }) {
    return (
        <div className="detalhes">
            <h2>{usuario.name}</h2>
            <p className="card-username">@{usuario.username}</p>

            <ul className="detalhes-lista">
                <li><strong>E-mail:</strong> {usuario.email}</li>
                <li><strong>Telefone:</strong> {usuario.phone ?? "Não informado"}</li>
                <li><strong>Site:</strong> {usuario.website ?? "Não informado"}</li>
                <li><strong>Empresa:</strong> {usuario.company?.name ?? "Não informada"}</li>
                <li><strong>Cidade:</strong> {usuario.address?.city ?? "Não informada"}</li>
            </ul>

            <button className="btn btn-primario" onClick={onFecharDetalhes}>
                Fechar
            </button>
        </div>
    );
}

export default UserDetailsComponent;