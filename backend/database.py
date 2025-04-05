# db.py

import motor.motor_asyncio

MONGO_DETAILS = "mongodb://localhost:27017"

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.smart_hostel

students_collection = database.get_collection("students")
visitors_collection = database.get_collection("visitors")
wardens_collection = database.get_collection("wardens")
admins_collection = database.get_collection("admins")
rooms_collection = database.get_collection("rooms")
attendance_collection = database.get_collection("attendance")
leaves_collection = database.get_collection("leave_requests")
complaints_collection = database.get_collection("complaints")
payments_collection = database.get_collection("payments")
mess_menu_collection = database.get_collection("mess_menu")
mess_feedback_collection = database.get_collection("mess_feedback")
