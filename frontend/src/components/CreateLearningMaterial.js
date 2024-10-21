import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import for animations

const CreateLearningMaterial = () => {
    const [materialData, setMaterialData] = useState({
        title: "",
        description: "",
        modules: [], // Array to hold dynamic modules
    });

    const navigate = useNavigate();

    // Handle input change for title and description
    const handleChange = (e) => {
        setMaterialData({
            ...materialData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle module changes
    const handleModuleChange = (index, e) => {
        const newModules = [...materialData.modules];
        newModules[index][e.target.name] = e.target.value;
        setMaterialData({ ...materialData, modules: newModules });
    };

    // Add new module
    const addModule = () => {
        setMaterialData({
            ...materialData,
            modules: [...materialData.modules, { title: "", content: "" }],
        });
    };

    // Remove module
    const removeModule = (index) => {
        const newModules = materialData.modules.filter((_, i) => i !== index);
        setMaterialData({ ...materialData, modules: newModules });
    };

    // Submit the learning material
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            await axios.post("http://localhost:5000/api/admin/create-learning-material", materialData, {
                headers: {
                    "x-auth-token": token,
                },
            });
            alert("Learning Material created successfully!");
            navigate("/admin-dashboard");
        } catch (err) {
            console.error(err);
            alert("Failed to create learning material.");
        }
    };

    return (
        <div className="container mt-5">
            <motion.h3
                className="text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Create Learning Material
            </motion.h3>
            <motion.form onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={materialData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={materialData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <h4>Modules</h4>
                {materialData.modules.map((module, index) => (
                    <motion.div
                        key={index}
                        className="form-group module-group"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <label>Module {index + 1}</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Module Title"
                            className="form-control"
                            value={module.title}
                            onChange={(e) => handleModuleChange(index, e)}
                            required
                        />
                        <textarea
                            name="content"
                            placeholder="Module Content"
                            className="form-control mt-2"
                            value={module.content}
                            onChange={(e) => handleModuleChange(index, e)}
                            required
                        ></textarea>
                        <button
                            type="button"
                            className="btn btn-danger mt-2"
                            onClick={() => removeModule(index)}
                        >
                            Delete Module
                        </button>
                    </motion.div>
                ))}
                <button type="button" className="btn btn-secondary mt-2" onClick={addModule} style={{ marginRight: '10px' }}>
                        Add Module
                </button>

                <button type="submit" className="btn btn-primary btn-block mt-2">
                        Submit
                </button>
                <div>
                    <button type="button" className="btn btn-danger btn-block mt-3" onClick={() => window.history.back()}>
                        Back
                    </button>
                </div>
            </motion.form>
        </div>
    );
};

export default CreateLearningMaterial;

