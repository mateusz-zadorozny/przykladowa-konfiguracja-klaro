export default {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*", // lub np. "http://localhost:4321"
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", {
        status: 405,
        headers: corsHeaders,
      });
    }

    try {
      const { uuid, consents, page, timestamp } = await request.json();
      const ip = request.headers.get("cf-connecting-ip") || "unknown";
      const userAgent = request.headers.get("user-agent") || "unknown";

      // consents to obiekt typu: { service1: true, service2: false }
      const inserts = Object.entries(consents).map(([service, state]) => {
        return env.DB.prepare(`
          INSERT INTO consent_logs 
            (uuid, service, state, page, ip, user_agent, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `).bind(
          uuid,
          service,
          state ? 1 : 0,
          page,
          ip,
          userAgent,
          timestamp
        );
      });

      for (const stmt of inserts) {
        await stmt.run();
      }

      return new Response("Consents logged", {
        status: 200,
        headers: corsHeaders,
      });
    } catch (err) {
      console.error("Consent log error:", err);
      return new Response("Error logging consent", {
        status: 500,
        headers: corsHeaders,
      });
    }
  },
};
