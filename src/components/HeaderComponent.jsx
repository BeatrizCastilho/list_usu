function HeaderComponent({ busca, setBusca }) {
    return (
        <header className="header">
            <h1>Listagem de Usuários</h1>
            <input
                type="search"
                className="busca"
                placeholder="Buscar por nome, usuário ou e-mail..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
            />
        </header>
    );
}

export default HeaderComponent;