import * as XLSX from "xlsx";

// Cache para almacenar los modelos ya cargados
const modelCache = new Map();

// Lista actualizada de marcas disponibles
const availableBrands = [
  "Alcatel",
  "Hisense",
  "Huawei",
  "Iphone",
  "Lanix",
  "LG",
  "M4",
  "Motorola",
  "Nokia",
  "Oppo",
  "Realme",
  "Samsung",
  "Vivo",
  "Xiaomi",
  "Xperia",
  "Zte",
];

export async function readModelsFromExcel(brandFileName) {
  if (modelCache.has(brandFileName)) {
    return modelCache.get(brandFileName);
  }

  try {
    const response = await fetch(`/data/${brandFileName}`);
    if (!response.ok) {
      throw new Error(`No se pudo cargar el archivo ${brandFileName}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);

    // Configuración específica para la lectura del Excel
    const workbook = XLSX.read(data, {
      type: "array",
      cellDates: true,
      cellNF: false,
      cellText: false,
    });

    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    // Configuración específica para la conversión a JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      raw: true,
      defval: "",
    });

    const models = jsonData
      .slice(1)
      .filter((row) => row.length >= 4)
      .map((row) => ({
        modelo: sanitizeString(row[0]),
        precio: parsePrice(row[1]),
        calidad: sanitizeString(row[2]),
        precioProveedor: parsePrice(row[3]),
      }))
      .filter((model) => model.modelo && !isNaN(model.precio));

    modelCache.set(brandFileName, models);
    return models;
  } catch (error) {
    console.error("Error al leer archivo Excel:", error);
    throw new Error(
      `Error al cargar los modelos de ${brandFileName}: ${error.message}`
    );
  }
}

function sanitizeString(value) {
  return typeof value === "string" ? value.trim() : String(value).trim();
}

function parsePrice(value) {
  const price = parseFloat(value);
  return isNaN(price) ? 0 : price;
}

export async function getAvailableBrands() {
  return Promise.resolve(availableBrands);
}

export function formatModelData(modelData) {
  return {
    modelo: modelData.modelo || "",
    precio: typeof modelData.precio === "number" ? modelData.precio : 0,
    calidad: modelData.calidad || "",
    precioProveedor:
      typeof modelData.precioProveedor === "number"
        ? modelData.precioProveedor
        : 0,
  };
}

export async function findModelInBrand(brandFileName, modelName) {
  try {
    const models = await readModelsFromExcel(brandFileName);
    const foundModel = models.find(
      (model) => model.modelo.toLowerCase() === modelName.toLowerCase()
    );
    return foundModel ? formatModelData(foundModel) : null;
  } catch (error) {
    console.error("Error al buscar modelo:", error);
    throw error;
  }
}

export function clearCache() {
  modelCache.clear();
}
