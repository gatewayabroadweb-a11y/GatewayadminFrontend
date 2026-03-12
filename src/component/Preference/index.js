import React, { useEffect, useState } from 'react';
import PageServices from '../../services/PageServices';
import useAsync from '../../hooks/useAsync';

const PreferenceView = () => {
    const { data } = useAsync(PageServices.getAllPreferences);
    const [formEntries, setFormEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setFormEntries(data);
        setLoading(false);
        setError(null);
        if (data && data.length === 0) {
            setError('No form entries found.');
        }
    }, [data]);

    return (
        <div className="content-wrapper">

            <section className="content-header">
                <div className="container-fluid">
                    <h2 className="mb-4 text-center">Submitted Form Data</h2>

                    {loading && (
                        <div className="text-center">
                            <div className="spinner-border text-primary" role="status"></div>
                        </div>
                    )}

                    {error && (
                        <div className="alert alert-danger text-center" role="alert">
                            {error}
                        </div>
                    )}

                    {!loading && !error && (
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover align-middle">
                                <thead className="table-dark">
                                    <tr className="text-center">
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Study</th>
                                        <th>Exam Status</th>
                                        <th>Program</th>
                                        <th>City</th>
                                        <th>Passport</th>
                                        <th>Grade</th>
                                        <th>Submitted At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(formEntries || []).map((entry, index) => (
                                        <tr key={entry._id}>
                                            <td className="text-center">{index + 1}</td>
                                            <td>{entry.name}</td>
                                            <td>{entry.email}</td>
                                            <td>{entry.phone}</td>
                                            <td>{entry.study}</td>
                                            <td>{entry.examStatus}</td>
                                            <td>{entry.program}</td>
                                            <td>{entry.city}</td>
                                            <td>{entry.fieldOfStudy}</td>
                                            <td>{entry.grade}</td>
                                            <td>{new Date(entry.createdAt).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </section>
        </div>

    );
};

export default PreferenceView;
