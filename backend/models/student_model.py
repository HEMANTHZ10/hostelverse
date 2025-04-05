from pydantic import BaseModel
from typing import Optional, List

class Student(BaseModel):
    id: Optional[int] = None
    name: str
    age: int
    email: str
    phone_number: str
    address: str
    branch:str
    
    class Config:
        from_attributes = True