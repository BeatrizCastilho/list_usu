import { useState } from "react";

const FORM_INICIAL = { name: "", username: "", email: "", phone: "" };

function UserForm({ onCadastrar }) {
    const [form, setForm] = useState(FORM_INICIAL);

    // Um único handler serve para todos os campos, usando o atributo "name"
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault(); // impede a página de recarregar
        onCadastrar(form);
        setForm(FORM_INICIAL); // limpa os campos
    }

    return (
        <form className="form-cadastro" onSubmit={handleSubmit}>
            <h2>Novo usuário</h2>

            <div className="campo">
                <label htmlFor="name">Nome</label>
                <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Ex: Maria Silva"
                    required
                />
            </div>

            <div className="campo">
                <label htmlFor="username">Usuário</label>
                <input
                    id="username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Ex: maria.silva"
                    required
                />
            </div>

            <div className="campo">
                <label htmlFor="email">E-mail</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="maria@email.com"
                    required
                />
            </div>

            <div className="campo">
                <label htmlFor="phone">Telefone (opcional)</label>
                <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(19) 99999-9999"
                />
            </div>

            <button type="submit" className="btn btn-primario">
                Cadastrar
            </button>
        </form>
    );
}

export default UserForm;