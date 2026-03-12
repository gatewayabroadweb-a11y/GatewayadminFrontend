import PageServices from '../../services/PageServices';
import useAsync from '../../hooks/useAsync';

const RegisterUser = () => {
    const { data: users } = useAsync(PageServices.GetAllUserList);


    return (
        <div className="content-wrapper">

            <section className="content-header">
                <div className="container-fluid">
                    <h2 className="mb-4 text-center">Registered Users</h2>
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark text-center">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Registered At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, i) => (
                                    <tr key={user._id}>
                                        <td className="text-center">{i + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{new Date(user.createdAt).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>

    );
};

export default RegisterUser;
