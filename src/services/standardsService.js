// src/services/standardsService.js
const API_BASE_URL = 'https://api.commonstandardsproject.com/api/v1';
const API_KEY = '5THZ3U1GLH9YjyiK2BS1oSn3';

const handleApiResponse = async (response, endpoint) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error (${response.status}): ${errorText}`);
  }

  const text = await response.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch (error) {
    console.error('Error parsing JSON:', error);
    throw new Error('Invalid JSON response from server');
  }
};

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Api-Key': API_KEY
});

const standardsService = {
  async getJurisdictions() {
    try {
      const response = await fetch(`${API_BASE_URL}/jurisdictions`, {
        headers: getHeaders()
      });

      const data = await handleApiResponse(response, 'jurisdictions');
      return { data: data.data || [] };
    } catch (error) {
      console.error('Error fetching jurisdictions:', error);
      return { data: [], error: error.message };
    }
  },

  async getJurisdiction(jurisdictionId) {
    try {
      const response = await fetch(`${API_BASE_URL}/jurisdictions/${jurisdictionId}`, {
        headers: getHeaders()
      });

      const data = await handleApiResponse(response, 'jurisdiction detail');
      return { data: data.data?.standardSets || [] };
    } catch (error) {
      console.error('Error fetching jurisdiction details:', error);
      return { data: [], error: error.message };
    }
  },

  async getStandards(standardSetId) {
    try {
      const response = await fetch(`${API_BASE_URL}/standard_sets/${standardSetId}`, {
        headers: getHeaders()
      });

      const data = await handleApiResponse(response, 'standard_set');
      return { data: data.data?.standards || {} };
    } catch (error) {
      console.error('Error fetching standards:', error);
      return { data: {}, error: error.message };
    }
  },

  async searchStandards(query, filters = {}) {
    try {
      const queryParams = new URLSearchParams({
        query,
        ...filters
      }).toString();

      const response = await fetch(`${API_BASE_URL}/search?${queryParams}`, {
        headers: getHeaders()
      });

      const data = await handleApiResponse(response, 'search');
      return { data: data.data || [] };
    } catch (error) {
      console.error('Error searching standards:', error);
      return { data: [], error: error.message };
    }
  }
};

export default standardsService;