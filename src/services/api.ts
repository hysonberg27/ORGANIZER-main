import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export interface Item {
  itemId: string;
  name: string;
  width: number;
  depth: number;
  height: number;
  priority: number;
  expiryDate?: string;
  usageLimit?: number;
  preferredZone?: string;
}

export interface Container {
  containerId: string;
  zone: string;
  width: number;
  depth: number;
  height: number;
}

export interface Position {
  startCoordinates: {
    width: number;
    depth: number;
    height: number;
  };
  endCoordinates: {
    width: number;
    depth: number;
    height: number;
  };
}

export interface SimulationItem {
  itemId?: string;
  name?: string;
}

export interface SimulationRequest {
  numOfDays?: number;
  toTimestamp?: string;
  itemsToBeUsedPerDay: SimulationItem[];
}

export const api = {
  // Get placement recommendations
  getPlacementRecommendations: async (items: Item[], containers: Container[]) => {
    const response = await axios.post(`${API_BASE_URL}/api/placement`, {
      items,
      containers,
    });
    return response.data;
  },

  // Search for an item
  searchItem: async (itemId?: string, itemName?: string, userId?: string) => {
    const response = await axios.get(`${API_BASE_URL}/api/search`, {
      params: { itemId, itemName, userId },
    });
    return response.data;
  },

  // Retrieve an item
  retrieveItem: async (itemId: string, userId: string) => {
    const response = await axios.post(`${API_BASE_URL}/api/retrieve`, {
      itemId,
      userId,
      timestamp: new Date().toISOString(),
    });
    return response.data;
  },

  // Place an item
  placeItem: async (itemId: string, userId: string, containerId: string, position: Position) => {
    const response = await axios.post(`${API_BASE_URL}/api/place`, {
      itemId,
      userId,
      timestamp: new Date().toISOString(),
      containerId,
      position,
    });
    return response.data;
  },

  // Import items from CSV
  importItems: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_BASE_URL}/api/import/items`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Import containers from CSV
  importContainers: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_BASE_URL}/api/import/containers`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Identify waste items
  identifyWasteItems: async () => {
    const response = await axios.get(`${API_BASE_URL}/api/waste/identify`);
    return response.data;
  },

  // Simulate day
  simulateDay: async (request: SimulationRequest) => {
    const response = await axios.post(`${API_BASE_URL}/api/simulate/day`, request);
    return response.data;
  },

  // Get logs
  getLogs: async (startDate: string, endDate: string, itemId?: string, userId?: string, actionType?: string) => {
    const response = await axios.get(`${API_BASE_URL}/api/logs`, {
      params: { startDate, endDate, itemId, userId, actionType },
    });
    return response.data;
  },
}; 