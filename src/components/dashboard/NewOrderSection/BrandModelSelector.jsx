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
            console.log(`Cargando modelos para la marca: ${brand}`); // Depuración
            const modelData = await readModelsFromExcel(brand.toLowerCase() + '.xlsx');
            
            // Validación de los datos devueltos
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

    const handleModelChange = (event) => {
        const model = event.target.value;
        setSelectedModel(model);
        onModelChange(model);
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Marca</label>
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
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Modelo</label>
                {loading ? (
                    <div className="text-gray-500">Cargando modelos...</div>
                ) : (
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
                    </select>
                )}
                {error && (
                    <div className="text-red-500 mt-1">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}

export default BrandModelSelector;
