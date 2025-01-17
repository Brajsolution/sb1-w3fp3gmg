/*
  # Initial Schema Setup for CryptoPower Platform

  1. New Tables
    - profiles
      - id (uuid, references auth.users)
      - username (text)
      - full_name (text)
      - avatar_url (text)
      - updated_at (timestamp)
    
    - wallets
      - id (uuid)
      - user_id (uuid, references auth.users)
      - balance (decimal)
      - currency (text)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - investments
      - id (uuid)
      - user_id (uuid, references auth.users)
      - plan_name (text)
      - amount (decimal)
      - daily_roi (decimal)
      - start_date (timestamp)
      - end_date (timestamp)
      - status (text)
      - created_at (timestamp)
    
    - transactions
      - id (uuid)
      - user_id (uuid, references auth.users)
      - type (text)
      - amount (decimal)
      - currency (text)
      - status (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username text UNIQUE,
  full_name text,
  avatar_url text,
  updated_at timestamptz DEFAULT now()
);

-- Create wallets table
CREATE TABLE wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  balance decimal DEFAULT 0,
  currency text DEFAULT 'USDT',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create investments table
CREATE TABLE investments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  plan_name text NOT NULL,
  amount decimal NOT NULL,
  daily_roi decimal NOT NULL,
  start_date timestamptz DEFAULT now(),
  end_date timestamptz NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'roi')),
  amount decimal NOT NULL,
  currency text DEFAULT 'USDT',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can view own wallet"
  ON wallets FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own investments"
  ON investments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create investments"
  ON investments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Functions
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, username, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  
  INSERT INTO wallets (user_id)
  VALUES (new.id);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY definer;

-- Trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();