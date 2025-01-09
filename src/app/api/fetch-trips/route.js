import { API_URL} from '../../../assets/api-endpoints/index'
import { backendAxiosInstance } from "../../../assets/hooks/backend-axios-instance";

export async function GET() {
  try {
    const response = await backendAxiosInstance.get(`${API_URL.FETCH_TRIPS}`);

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: e.response?.status ?? 500,
    });
  }
}
