from pydantic import BaseModel
from typing import Optional, List

class Student(BaseModel):
    Id: str
    name: str
    age: int
    email: str
    password: str
    parent_mobile_no: str
    student_mobile_no: str
    address: str
    branch:str
    roll_no:Optional[str] = None
    
    class Config:
        from_attributes = True