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
            console.error('Error al cargar marcas:', error);
        }
    };

    const loadModels = async (brand) => {
        setLoading(true);
        setError(null);
        try {
            console.log(`Cargando modelos para la marca: ${brand}`);
            const modelData = await readModelsFromExcel(brand.toLowerCase() + '.xlsx');
            
            if (Array.isArray(modelData) && modelData.length > 0) {
                setModels(modelData);
                console.log('Modelos cargados:', modelData);
            } else {
                setModels([]);
                setError('No se encontraron modelos para esta marca.');
                console.warn('No se encontraron modelos en el archivo.');
            }
        } catch (error) {
            setError('Error al cargar los modelos');
            console.error('Error al cargar modelos:', error);
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
            setIsCustomModel(false);
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
                <label className="block text-sm font-medium text-gray-700">Marca</label>
                {!isCustomBrand ? (
                    <select
                        value={selectedBrand}
                        onChange={handleBrandChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    >
                        <option value="">Seleccionar marca</option>
                        {brands.map((brand, index) => (
                            <option key={`${brand}-${index}`} value={brand}>
                                {brand}
                            </option>
                        ))}
                        <option value="custom">Otra marca...</option>
                    </select>
                ) : (
                    <div className="space-y-2">
                        <input
                            type="text"
                            value={customBrand}
                            onChange={handleCustomBrandChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Escribir marca"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setIsCustomBrand(false);
                                setCustomBrand('');
                            }}
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            Volver a lista de marcas
                        </button>
                    </div>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Modelo</label>
                {loading ? (
                    <div className="mt-1 text-gray-500">Cargando modelos...</div>
                ) : !isCustomModel && !isCustomBrand ? (
                    <select
                        value={selectedModel}
                        onChange={handleModelChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                        disabled={!selectedBrand || models.length === 0}
                    >
                        <option value="">Seleccionar modelo</option>
                        {models.map((model, index) => (
                            <option key={`${model.modelo}-${index}`} value={model.modelo}>
                                {model.modelo}
                            </option>
                        ))}
                        <option value="custom">Otro modelo...</option>
                    </select>
                ) : (
                    <div className="space-y-2">
                        <input
                            type="text"
                            value={customModel}
                            onChange={handleCustomModelChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Escribir modelo"
                            required
                        />
                        {!isCustomBrand && (
                            <button
                                type="button"
                                onClick={() => {
                                    setIsCustomModel(false);
                                    setCustomModel('');
                                }}
                                className="text-sm text-blue-600 hover:text-blue-800"
                            >
                                Volver a lista de modelos
                            </button>
                        )}
                    </div>
                )}
                {error && (
                    <div className="text-red-500 text-sm mt-1">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}

export default BrandModelSelector;