import asyncio
from uuid import uuid4
from database import students_collection
from models.student_model import Student

sample_students = [
    {
        "id": uuid4().hex,
        "name": "Rohit Mathi",
        "age": 21,
        "email": "rohitmathi@example.com",
        "phone_number": "9876543210",
        "address": "123, Jubilee Hills, Hyderabad",
        "branch": "CSE"
    },
    {
        "id": uuid4().hex,
        "name": "Meera Shah",
        "age": 20,
        "email": "meerashah@example.com",
        "phone_number": "9001122233",
        "address": "11, Banjara Hills, Hyderabad",
        "branch": "ECE"
    },
    {
        "id": uuid4().hex,
        "name": "Ishaan Verma",
        "age": 22,
        "email": "ishaanverma@example.com",
        "phone_number": "9988776655",
        "address": "Block 5, Gachibowli Hostel, Hyderabad",
        "branch": "MECH"
    },
    {
        "id": uuid4().hex,
        "name": "Sara Iqbal",
        "age": 21,
        "email": "sara.iqbal@example.com",
        "phone_number": "9876123450",
        "address": "Flat 202, SR Residency, Kondapur",
        "branch": "CIVIL"
    },
    {
        "id": uuid4().hex,
        "name": "Aarav Kumar",
        "age": 19,
        "email": "aaravk@example.com",
        "phone_number": "9123456789",
        "address": "Hostel Block A, Room 204",
        "branch": "IT"
    },
]

async def getStudentsData():
    students = []
    async for student in students_collection.find():
        students.append(Student(**student))
    return students

async def addStudentData(student: Student):
    student_data = student.model_dump()
    await students_collection.insert_one(student_data)
    return student



