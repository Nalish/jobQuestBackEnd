CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL CHECK (name IN ('Jobseeker', 'Employer', 'Admin'))
);
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE RESTRICT
);
CREATE TABLE job_seeker_profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  country VARCHAR(100),
  date_of_birth DATE,
  job_role VARCHAR(100),
  experience_level VARCHAR(20) CHECK (experience_level IN ('entry', 'mid', 'senior'))
);

CREATE TABLE employer_profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  company_name VARCHAR(100) NOT NULL,
  contact_person VARCHAR(100),
  website TEXT,
  industry VARCHAR(100),
  location VARCHAR(100)
);

CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  employer_id INTEGER NOT NULL REFERENCES employer_profiles(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  requirements TEXT,
  location VARCHAR(100),
  experience_level VARCHAR(20) CHECK (experience_level IN ('entry', 'mid', 'senior')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE cvs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  job_id INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  cv_id INTEGER NOT NULL REFERENCES cvs(id) ON DELETE SET NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')),
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Skills table
CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

-- Many-to-many: Job seeker skills
CREATE TABLE job_seeker_skills (
  id SERIAL PRIMARY KEY,
  job_seeker_id INTEGER NOT NULL REFERENCES job_seeker_profiles(id) ON DELETE CASCADE,
  skill_id INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  UNIQUE (job_seeker_id, skill_id)
);

-- Many-to-many: Job required skills
CREATE TABLE job_skills (
  id SERIAL PRIMARY KEY,
  job_id INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  skill_id INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  UNIQUE (job_id, skill_id)
);

INSERT INTO roles (name) VALUES ('Jobseeker');
INSERT INTO roles (name) VALUES ('Employer');
INSERT INTO roles (name) VALUES ('Admin');

