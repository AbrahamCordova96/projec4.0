import React, { useEffect, useState } from 'react';
import { getAvailableBrands, readModelsFromExcel } from '../../../utils/excelReader';

function BrandModelSelector({ onBrandChange, onModelChange, initialBrand = '', initialModel = '' }) {
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(initialBrand);
    const [selectedModel, setSelectedModel] = useState(initialModel);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isCustomBrand, setIsCustomBrand] = useState(false);
    const [isCustomModel, setIsCustomModel] = useState(false);
    const [customBrand, setCustomBrand] = useState('');
    const [customModel, setCustomModel] = useState('');

    useEffect(() => {
        loadBrands();
    }, []);

    useEffect(() => {
        if (selectedBrand && !isCustomBrand) {
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
        if (brand === 'custom') {
            setIsCustomBrand(true);
            setCustomBrand('');
            setSelectedBrand('');
            setModels([]);
            onBrandChange('');
        } else {
            setIsCustomBrand(false);
            setSelectedBrand(brand);
            setCustomBrand('');
            setSelectedModel('');
            onBrandChange(brand);
        }
    };

    const handleCustomBrandChange = (event) => {
        const brand = event.target.value;
        setCustomBrand(brand);
        onBrandChange(brand);
    };

    const handleModelChange = (event) => {
        const model = event.target.value;
        if (model === 'custom') {
            setIsCustomModel(true);
            setCustomModel('');
            setSelectedModel('');
            onModelChange('', null);
        } else {
            setIsCustomModel(false);
            setSelectedModel(model);
            const selectedModelData = models.find(m => m.modelo === model);
            onModelChange(model, selectedModelData);
        }
    };

    const handleCustomModelChange = (event) => {
        const model = event.target.value;
        setCustomModel(model);
        onModelChange(model, null);
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Marca
                </label>
                {!isCustomBrand ? (
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
                        <option value="custom">Otra marca...</option>
                    </select>
                ) : (
                    <input
                        type="text"
                        value={customBrand}
                        onChange={handleCustomBrandChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Escribir marca"
                        required
                    />
                )}
                {isCustomBrand && (
                    <button
                        onClick={() => setIsCustomBrand(false)}
                        className="mt-1 text-sm text-blue-600 hover:text-blue-800"
                    >
                        Volver a lista de marcas
                    </button>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Modelo
                </label>
                {!isCustomModel && !isCustomBrand ? (
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
                        <option value="custom">Otro modelo...</option>
                    </select>
                ) : (
                    <input
                        type="text"
                        value={customModel}
                        onChange={handleCustomModelChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Escribir modelo"
                        required
                    />
                )}
                {isCustomModel && !isCustomBrand && (
                    <button
                        onClick={() => setIsCustomModel(false)}
                        className="mt-1 text-sm text-blue-600 hover:text-blue-800"
                    >
                        Volver a lista de modelos
                    </button>
                )}
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