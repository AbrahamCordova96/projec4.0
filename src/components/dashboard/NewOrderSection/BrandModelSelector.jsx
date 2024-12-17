import React, { useState, useEffect } from 'react';
import { readModelsFromExcel, getAvailableBrands } from '../../../utils/excelReader';

function BrandModelSelector({ onBrandChange, onModelChange, initialBrand = '', initialModel = '' }) {
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(initialBrand);
    const [selectedModel, setSelectedModel] = useState(initialModel);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Cargar las marcas disponibles al montar el componente
    useEffect(() => {
        loadBrands();
    }, []);

    // Cargar los modelos cuando se selecciona una marca
    useEffect(() => {
        if (selectedBrand) {
            loadModels(selectedBrand);
        }
    }, [selectedBrand]);

    const loadBrands = async () => {
        try {
            setError(null);
            const availableBrands = await getAvailableBrands();
            setBrands(availableBrands);
        } catch (error) {
            setError('No se pudieron cargar las marcas disponibles');
            console.error('Error loading brands:', error);
        }
    };

    const loadModels = async (brand) => {
        setLoading(true);
        setError(null);
        try {
            const modelData = await readModelsFromExcel(brand.toLowerCase() + '.xlsx');
            setModels(modelData);
        } catch (error) {
            setError('Error al cargar los modelos');
            console.error('Error loading models:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBrandChange = (event) => {
        const brand = event.target.value;
        setSelectedBrand(brand);
        setSelectedModel('');
        onBrandChange(brand);
    };

    const handleModelChange = (event) => {
        const model = event.target.value;
        setSelectedModel(model);
        const selectedModelData = models.find(m => m.modelo === model);
        onModelChange(model, selectedModelData);
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Marca
                </label>
                <select
                    value={selectedBrand}
                    onChange={handleBrandChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                >
                    <option value="">Seleccionar marca</option>
                    {brands.map((brand) => (
                        <option key={brand} value={brand}>
                            {brand}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Modelo
                </label>
                <select
                    value={selectedModel}
                    onChange={handleModelChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                    disabled={!selectedBrand || loading}
                >
                    <option value="">Seleccionar modelo</option>
                    {models.map((model) => (
                        <option key={model.modelo} value={model.modelo}>
                            {model.modelo}
                        </option>
                    ))}
                </select>
            </div>

            {loading && (
                <div className="col-span-2 text-center text-sm text-gray-500">
                    Cargando modelos...
                </div>
            )}
            
            {error && (
                <div className="col-span-2 text-center text-sm text-red-500">
                    {error}
                </div>
            )}
        </div>
    );
}

export default BrandModelSelector;