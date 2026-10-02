import UserCardComponent from "./UserCardComponent";

function UserListComponent({ usuarios, onSelecionarUsuario, onExcluirUsuario }) {
    return (
        <div className="lista-usuarios">
            {usuarios.map((usuario) => (
                <UserCardComponent
                    key={usuario.id}
                    usuario={usuario}
                    onSelecionarUsuario={onSelecionarUsuario}
                    onExcluirUsuario={onExcluirUsuario}
                />
            ))}
        </div>
    );
}

export default UserListComponent;