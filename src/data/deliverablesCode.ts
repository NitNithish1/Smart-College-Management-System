import { CodeDeliverableFile } from '../types';

export const deliverablesFiles: CodeDeliverableFile[] = [
  {
    path: '1_project_structure.md',
    name: '1. Project Folder Structure',
    language: 'markdown',
    category: 'DOCUMENTATION',
    content: `# Smart College Management System – Folder Architecture

## 1. Flutter Mobile Client Architecture (Clean Architecture Pattern)
\`\`\`text
smartcollege_app/
├── android/                   # Android native config & Gradle setup
├── ios/                       # iOS configuration
├── assets/
│   ├── images/                # College logo, icons, default avatar
│   └── fonts/                 # Google Fonts (Roboto / Plus Jakarta)
├── lib/
│   ├── main.dart              # App entry point, MultiProvider setup
│   ├── config/
│   │   ├── app_theme.dart     # Material 3 Light/Dark theme configuration
│   │   ├── constants.dart     # API URLs, shared prefs keys, colors
│   │   └── routes.dart        # Named route generator
│   ├── models/
│   │   ├── user_model.dart    # User role & profile DTO
│   │   ├── attendance_model.dart # Daily & subject attendance
│   │   ├── marks_model.dart   # Internal & semester marks
│   │   ├── leave_model.dart   # Leave / OD application
│   │   └── ai_response_model.dart # Gemini AI analytics DTO
│   ├── providers/             # State Management (Provider / Riverpod)
│   │   ├── auth_provider.dart # JWT Auth & Session persistence
│   │   ├── attendance_provider.dart # Mark/view attendance state
│   │   ├── marks_provider.dart # Internal marks state
│   │   └── ai_provider.dart   # Gemini AI prediction state
│   ├── services/
│   │   ├── api_service.dart   # Dio HTTP client with JWT interceptors
│   │   ├── ai_service.dart    # REST proxy to Spring Boot / Gemini API
│   │   └── notification_service.dart # Firebase Cloud Messaging (FCM)
│   ├── screens/
│   │   ├── auth/              # Login, Splash, Role Selector
│   │   ├── student/           # Dashboard, Timetable, Marks, Hall Ticket, AI Chat
│   │   ├── faculty/           # Attendance Marking, Notes Upload, Approvals
│   │   ├── hod/               # Department Analytics, Faculty Reports
│   │   └── admin/             # User Management, Timetable Editor, Backup
│   └── widgets/               # Reusable Material 3 Cards, Buttons, Shimmers
└── pubspec.yaml               # Flutter dependencies (Provider, Dio, FCM, Syncfusion Charts)
\`\`\`

## 2. Spring Boot Backend Architecture (Layered REST Architecture)
\`\`\`text
smartcollege-backend/
├── src/main/java/com/smartcollege/app/
│   ├── SmartCollegeApplication.java
│   ├── config/
│   │   ├── SecurityConfig.java      # Spring Security 6 & JWT Filter
│   │   ├── CorsConfig.java          # Cross-Origin configuration
│   │   └── SwaggerConfig.java       # OpenAPI / Swagger UI setup
│   ├── controller/
│   │   ├── AuthController.java      # Login & Token Refresh REST API
│   │   ├── StudentController.java   # Profile, Timetable, Marks, Hall Ticket
│   │   ├── AttendanceController.java# Attendance submission & analytics
│   │   ├── LeaveRequestController.java# Leave/OD workflow REST API
│   │   └── AiAnalyticsController.java# Gemini REST API Bridge
│   ├── entity/
│   │   ├── User.java, Student.java, Faculty.java
│   │   ├── Attendance.java, Subject.java, Marks.java
│   │   └── LeaveRequest.java, Notice.java
│   ├── repository/                  # Spring Data JPA Repositories
│   ├── service/                     # Business Logic Services
│   │   ├── AttendanceService.java
│   │   └── GeminiPredictionService.java
│   └── dto/                         # Request & Response Payload DTOs
├── src/main/resources/
│   ├── application.yml              # Database URL, JWT Secret, FCM Config
│   ├── db/migration/                # Flyway / Liquibase SQL migration scripts
└── pom.xml                          # Maven dependencies (Spring Boot 3, MySQL, JWT, Gemini)
\`\`\`
`,
  },
  {
    path: '2_database_schema.sql',
    name: '2. Database Schema (MySQL DDL)',
    language: 'sql',
    category: 'MYSQL',
    content: `-- ============================================================================
-- Smart College Management System - MySQL Database Schema
-- Database: college_db
-- ============================================================================

CREATE DATABASE IF NOT EXISTS college_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE college_db;

-- 1. Departments Table
CREATE TABLE IF NOT EXISTS departments (
    dept_id INT AUTO_INCREMENT PRIMARY KEY,
    dept_code VARCHAR(10) UNIQUE NOT NULL,
    dept_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Users Table (Core Auth & Roles)
CREATE TABLE IF NOT EXISTS users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('STUDENT', 'FACULTY', 'HOD', 'ADMIN') NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Students Table
CREATE TABLE IF NOT EXISTS students (
    student_id BIGINT PRIMARY KEY,
    roll_no VARCHAR(20) UNIQUE NOT NULL,
    register_no VARCHAR(20) UNIQUE NOT NULL,
    batch VARCHAR(10) NOT NULL, -- e.g. 2021-2025
    semester INT NOT NULL CHECK (semester BETWEEN 1 AND 8),
    section CHAR(1) NOT NULL DEFAULT 'A',
    dept_id INT NOT NULL,
    cgpa DECIMAL(3,2) DEFAULT 0.00,
    mentor_faculty_id BIGINT,
    FOREIGN KEY (student_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

-- 4. Faculty Table
CREATE TABLE IF NOT EXISTS faculty (
    faculty_id BIGINT PRIMARY KEY,
    employee_id VARCHAR(20) UNIQUE NOT NULL,
    designation VARCHAR(50) NOT NULL,
    dept_id INT NOT NULL,
    FOREIGN KEY (faculty_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

-- 5. Subjects / Courses Table
CREATE TABLE IF NOT EXISTS subjects (
    subject_id INT AUTO_INCREMENT PRIMARY KEY,
    subject_code VARCHAR(15) UNIQUE NOT NULL,
    subject_name VARCHAR(120) NOT NULL,
    credits INT NOT NULL DEFAULT 3,
    semester INT NOT NULL,
    dept_id INT NOT NULL,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

-- 6. Attendance Records Table
CREATE TABLE IF NOT EXISTS attendance_records (
    attendance_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    subject_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    period_no INT NOT NULL,
    status ENUM('PRESENT', 'ABSENT', 'ON_DUTY') NOT NULL,
    marked_by_faculty_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),
    FOREIGN KEY (marked_by_faculty_id) REFERENCES faculty(faculty_id),
    UNIQUE KEY unique_daily_period (student_id, subject_id, attendance_date, period_no)
);

-- 7. Internal Marks Table
CREATE TABLE IF NOT EXISTS internal_marks (
    mark_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    subject_id INT NOT NULL,
    internal_1 DECIMAL(5,2) DEFAULT 0.00,
    internal_2 DECIMAL(5,2) DEFAULT 0.00,
    model_exam DECIMAL(5,2) DEFAULT 0.00,
    assignment_marks DECIMAL(4,2) DEFAULT 0.00,
    attendance_marks DECIMAL(3,2) DEFAULT 0.00,
    total_internal DECIMAL(5,2) DEFAULT 0.00,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),
    UNIQUE KEY unique_student_subject (student_id, subject_id)
);

-- 8. Leave & On-Duty Requests Table
CREATE TABLE IF NOT EXISTS leave_requests (
    request_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    request_type ENUM('LEAVE', 'ON_DUTY', 'MEDICAL') NOT NULL,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    total_days INT NOT NULL,
    reason TEXT NOT NULL,
    document_path VARCHAR(255),
    status ENUM('PENDING', 'APPROVED_BY_FACULTY', 'APPROVED_BY_HOD', 'REJECTED') DEFAULT 'PENDING',
    approved_by BIGINT,
    remarks VARCHAR(255),
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);

-- Indexes for Speed & Performance
CREATE INDEX idx_student_roll ON students(roll_no);
CREATE INDEX idx_attendance_date ON attendance_records(attendance_date);
CREATE INDEX idx_marks_student ON internal_marks(student_id);
`,
  },
  {
    path: '3_er_diagram.md',
    name: '3. ER Diagram Specification',
    language: 'markdown',
    category: 'ER_DIAGRAM',
    content: `# Entity-Relationship (ER) Diagram Specification

## Relational Entity Mapping

\`\`\`text
  +------------------+         +------------------+         +------------------+
  |   DEPARTMENTS    | 1     * |      USERS       | 1     1 |     STUDENTS     |
  +------------------+---------+------------------+---------+------------------+
  | PK: dept_id      |         | PK: user_id      |         | PK/FK: student_id|
  |     dept_code    |         |     email        |         |     roll_no      |
  |     dept_name    |         |     password_hash|         |     register_no  |
  +------------------+         |     role         |         |     cgpa         |
           | 1                 |     full_name    |         +------------------+
           |                   +------------------+                  | 1
           |                            | 1                          |
           | *                          | 1                          | *
  +------------------+         +------------------+         +------------------+
  |     SUBJECTS     |         |     FACULTY      |         |ATTENDANCE_RECORDS|
  +------------------+         +------------------+         +------------------+
  | PK: subject_id   |         | PK/FK: faculty_id|         | PK: attendance_id|
  |     subject_code |         |     employee_id  |         | FK: student_id   |
  |     subject_name |         |     designation  |         | FK: subject_id   |
  | FK: dept_id      |         +------------------+         |     status       |
  +------------------+                  | 1                 +------------------+
           | 1                          |                            |
           |                            |                            |
           +----------------------------+----------------------------+
                                        | *
                               +------------------+
                               |  INTERNAL_MARKS  |
                               +------------------+
                               | PK: mark_id      |
                               | FK: student_id   |
                               | FK: subject_id   |
                               |     internal_1   |
                               |     internal_2   |
                               +------------------+
\`\`\`
`,
  },
  {
    path: '4_rest_apis.md',
    name: '4. REST API Specification',
    language: 'markdown',
    category: 'REST_APIS',
    content: `# Smart College Management System - Spring Boot REST API Endpoint Reference

## 1. Authentication Endpoints (\`/api/v1/auth\`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | \`/api/v1/auth/login\` | Public | User authentication returning JWT token & user profile |
| POST | \`/api/v1/auth/refresh\` | Authenticated | Refresh expired access token |
| POST | \`/api/v1/auth/change-password\` | Authenticated | Change user password |

## 2. Student Endpoints (\`/api/v1/student\`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | \`/api/v1/student/dashboard\` | Student | Get timetable, overall attendance %, pending fee |
| GET | \`/api/v1/student/attendance\` | Student | Get subject-wise attendance breakdown |
| GET | \`/api/v1/student/marks\` | Student | Get Internal 1, 2, Model, and predicted grades |
| POST | \`/api/v1/student/leave-request\` | Student | Apply for Leave / OD request with attachment |
| GET | \`/api/v1/student/hall-ticket\` | Student | Get examination hall ticket details & QR code |

## 3. Faculty Endpoints (\`/api/v1/faculty\`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | \`/api/v1/faculty/attendance/mark\` | Faculty | Mark period attendance for entire class |
| POST | \`/api/v1/faculty/marks/update\` | Faculty | Upload/Update internal marks for students |
| GET | \`/api/v1/faculty/leave-requests\` | Faculty | View pending student leave applications |
| PUT | \`/api/v1/faculty/leave-requests/{id}/approve\` | Faculty | Approve/Reject leave request |

## 4. AI Analytics Endpoints (\`/api/v1/ai\`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | \`/api/v1/ai/chat\` | All Roles | Conversational AI assistant for college queries |
| POST | \`/api/v1/ai/predict-attendance-risk\` | Student/Faculty | Gemini AI attendance risk analysis |
| POST | \`/api/v1/ai/predict-performance\` | Student/HOD | AI SGPA/CGPA grade forecast |
| POST | \`/api/v1/ai/placement-readiness\` | Student/Admin | AI placement readiness score & gap analysis |
`,
  },
  {
    path: '5_flutter_main.dart',
    name: '5. Flutter Code - lib/main.dart',
    language: 'dart',
    category: 'FLUTTER',
    content: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:smartcollege_app/config/app_theme.dart';
import 'package:smartcollege_app/providers/auth_provider.dart';
import 'package:smartcollege_app/providers/attendance_provider.dart';
import 'package:smartcollege_app/providers/ai_provider.dart';
import 'package:smartcollege_app/screens/auth/login_screen.dart';
import 'package:smartcollege_app/screens/student/student_dashboard.dart';
import 'package:smartcollege_app/screens/faculty/faculty_dashboard.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const SmartCollegeApp());
}

class SmartCollegeApp extends StatelessWidget {
  const SmartCollegeApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => AttendanceProvider()),
        ChangeNotifierProvider(create: (_) => AiProvider()),
      ],
      child: Consumer<AuthProvider>(
        builder: (context, auth, _) {
          return MaterialApp(
            title: 'Smart College Management System',
            debugShowCheckedModeBanner: false,
            theme: AppTheme.lightTheme,
            darkTheme: AppTheme.darkTheme,
            themeMode: ThemeMode.system,
            home: auth.isAuthenticated
                ? auth.isStudent
                    ? const StudentDashboardScreen()
                    : const FacultyDashboardScreen()
                : const LoginScreen(),
          );
        },
      ),
    );
  }
}
`,
  },
  {
    path: '6_flutter_student_dashboard.dart',
    name: '6. Flutter Code - Student Dashboard',
    language: 'dart',
    category: 'FLUTTER',
    content: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:smartcollege_app/providers/auth_provider.dart';
import 'package:smartcollege_app/providers/ai_provider.dart';

class StudentDashboardScreen extends StatefulWidget {
  const StudentDashboardScreen({super.key});

  @override
  State<StudentDashboardScreen> createState() => _StudentDashboardScreenState();
}

class _StudentDashboardScreenState extends State<StudentDashboardScreen> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    final user = context.watch<AuthProvider>().user;
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Smart College Management System'),
        centerTitle: false,
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_active_outlined),
            onPressed: () {},
          ),
          CircleAvatar(
            radius: 16,
            backgroundImage: NetworkImage(user?.avatarUrl ?? ''),
          ),
          const SizedBox(width: 12),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Student Profile Header Card
            Card(
              elevation: 0,
              color: theme.colorScheme.primaryContainer,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Welcome back,', style: theme.textTheme.bodyMedium),
                          Text(
                            user?.name ?? 'GN Nithish',
                            style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
                          ),
                          const SizedBox(height: 4),
                          Text('\${user?.rollNo} • \${user?.department}', style: theme.textTheme.labelMedium),
                        ],
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Column(
                        children: [
                          Text('CGPA', style: theme.textTheme.labelSmall),
                          Text('8.42', style: theme.textTheme.titleMedium?.copyWith(color: Colors.indigo, fontWeight: FontWeight.bold)),
                        ],
                      ),
                    )
                  ],
                ),
              ),
            ),
            const SizedBox(height: 20),

            // AI Attendance Risk Quick Tile
            Card(
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              child: ListTile(
                leading: const CircleAvatar(
                  backgroundColor: Colors.amber,
                  child: Icon(Icons.auto_awesome, color: Colors.white),
                ),
                title: const Text('AI Attendance Risk Prediction'),
                subtitle: const Text('Current: 78.5% • Safe Margin: +2 Leaves'),
                trailing: const Icon(Icons.arrow_forward_ios, size: 16),
                onTap: () {
                  context.read<AiProvider>().fetchAttendanceRiskPrediction(78.5);
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
`,
  },
  {
    path: '7_spring_boot_controller.java',
    name: '7. Spring Boot - AttendanceController.java',
    language: 'java',
    category: 'SPRING_BOOT',
    content: `package com.smartcollege.app.controller;

import com.smartcollege.app.dto.AttendanceSubmissionDto;
import com.smartcollege.app.dto.SubjectAttendanceResponseDto;
import com.smartcollege.app.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasAnyRole('STUDENT', 'FACULTY', 'HOD', 'ADMIN')")
    public ResponseEntity<List<SubjectAttendanceResponseDto>> getStudentAttendance(@PathVariable Long studentId) {
        List<SubjectAttendanceResponseDto> attendanceList = attendanceService.getAttendanceForStudent(studentId);
        return ResponseEntity.ok(attendanceList);
    }

    @PostMapping("/mark")
    @PreAuthorize("hasAnyRole('FACULTY', 'HOD')")
    public ResponseEntity<String> markClassAttendance(@RequestBody AttendanceSubmissionDto submissionDto) {
        attendanceService.submitClassAttendance(submissionDto);
        return ResponseEntity.ok("Attendance recorded successfully for period " + submissionDto.getPeriodNo());
    }
}
`,
  },
  {
    path: '8_spring_boot_ai_service.java',
    name: '8. Spring Boot - AiAnalyticsController.java',
    language: 'java',
    category: 'SPRING_BOOT',
    content: `package com.smartcollege.app.controller;

import com.google.genai.GoogleGenAI;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/ai")
public class AiAnalyticsController {

    @Value("\${gemini.api.key}")
    private String geminiApiKey;

    @PostMapping("/predict-attendance-risk")
    public ResponseEntity<String> predictAttendanceRisk(@RequestBody Map<String, Object> payload) {
        GoogleGenAI ai = GoogleGenAI.builder()
                .apiKey(geminiApiKey)
                .build();

        String prompt = "Analyze student attendance percentage: " + payload.get("attendancePercentage") + "%";
        GenerateContentResponse response = ai.models().generateContent("gemini-3.6-flash", prompt, null);

        return ResponseEntity.ok(response.getText());
    }
}
`,
  },
  {
    path: '9_readme.md',
    name: '9. Comprehensive README',
    language: 'markdown',
    category: 'DOCUMENTATION',
    content: `# Smart College Management System – AI-Powered Institutional Ecosystem

Smart College Management System is a modern, full-stack, AI-powered Smart College Management Mobile and Web ecosystem designed for engineering and degree institutions.

## Key Highlights
- **Clean Architecture & Design**: Built with Material 3 design guidelines and scalable separation of concerns.
- **4 Distinct User Roles**: Student, Faculty, Head of Department (HOD), and Admin.
- **Gemini AI Integration**: Real-time Attendance Risk Prediction, Academic Performance & SGPA Forecast, Placement Readiness Scoring, and 24/7 AI Campus Assistant.
- **Full Backend Pipeline**: Complete Spring Boot REST API code, MySQL relational schema, and Flutter client.

## Tech Stack
- **Frontend**: Flutter 3.x / React 19 (Web Demo) + Material 3 + Tailwind CSS
- **Backend**: Spring Boot 3.x (Java 17) / Express Node Server
- **Database**: MySQL 8.0 with JPA / Hibernate ORM
- **AI Engine**: Google Gemini API (\`gemini-3.6-flash\`) via \`@google/genai\`
- **Security**: JWT Authentication + Spring Security 6 Role Guards
`,
  },
  {
    path: '10_deployment_guide.md',
    name: '10. Production Deployment Guide',
    language: 'markdown',
    category: 'DOCUMENTATION',
    content: `# Production Deployment Guide

## 1. Android App Build (Flutter)
\`\`\`bash
# Generate APK for Android
flutter clean
flutter pub get
flutter build apk --release --split-per-abi

# Output: build/app/outputs/flutter-apk/app-arm64-v8a-release.apk
\`\`\`

## 2. Spring Boot Production JAR & Docker Containerization
\`\`\`bash
# Build JAR file
./mvnw clean package -DskipTests

# Dockerize Backend
docker build -t smartcollege-backend:v1.0 .
docker run -d -p 8080:8080 --env-file .env smartcollege-backend:v1.0
\`\`\`

## 3. MySQL Database Setup
\`\`\`bash
mysql -u root -p < schema.sql
mysql -u root -p smartcollege_db < data.sql
\`\`\`
`,
  },
];
