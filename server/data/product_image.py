from typing import Optional

from pydantic import BaseModel


class ProductImage(BaseModel):
    ItemCode: str
    image_url: Optional[str] = ''
