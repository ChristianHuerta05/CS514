import os
import httpx
from fastapi import FastAPI, Request, Response

app = FastAPI()

URLS = {
    "auth": os.getenv("API_CHRIS_URL"),
    "users": os.getenv("API_CHRIS_URL"),
    "events": os.getenv("API_JACK_URL"),
    "venues": os.getenv("API_JACK_URL"),
    "orders": os.getenv("API_JURNE_URL"),
    "tickets": os.getenv("API_JURNE_URL"),
}

@app.api_route("/{path:path}", methods=["GET", "POST", "PUT", "PATCH", "DELETE"])
async def proxy(path: str, request: Request):
    actual_path = path.split("/")[0]
    where_to_route = URLS.get(actual_path)

    if not where_to_route:
        return Response("endpoint does not exist", status_code=404)

    async with httpx.AsyncClient() as client:
        res = await client.request(
            method=request.method,
            url=f"{where_to_route}/{path}",
            params=request.query_params,
            content=await request.body(),
            headers={k: v for k, v in request.headers.items() if k.lower() != "host"},
        )

    return Response(content=res.content,status_code=res.status_code,media_type=res.headers.get("content-type"),)
