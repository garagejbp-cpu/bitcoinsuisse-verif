import requests
import sys
from datetime import datetime

class BitcoinSuisseAPITester:
    def __init__(self, base_url="https://crypto-kyc.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {response_data}")
                except:
                    print(f"   Response: {response.text[:200]}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}")
                self.failed_tests.append({
                    'test': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response.text[:200]
                })

            return success, response.json() if success and response.text else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                'test': name,
                'error': str(e)
            })
            return False, {}

    def test_health_check(self):
        """Test health check endpoint"""
        success, response = self.run_test(
            "Health Check",
            "GET",
            "api/health",
            200
        )
        return success

    def test_get_news(self):
        """Test get news endpoint"""
        success, response = self.run_test(
            "Get News",
            "GET",
            "api/news",
            200
        )
        if success and 'news' in response:
            print(f"   Found {len(response['news'])} news articles")
            if len(response['news']) >= 3:
                print(f"   ✅ Expected 3 news articles, found {len(response['news'])}")
            else:
                print(f"   ⚠️  Expected 3 news articles, found {len(response['news'])}")
        return success

    def test_contact_form_valid(self):
        """Test contact form with valid data"""
        test_data = {
            "type": "Demandes Générales",
            "company": "Test Company",
            "first_name": "Jean",
            "last_name": "Dupont",
            "email": "jean.dupont@test.com",
            "phone": "+41 79 123 45 67",
            "category": "Autre Demande",
            "subject": "Test Subject",
            "description": "This is a test description for the contact form."
        }
        
        success, response = self.run_test(
            "Contact Form - Valid Data",
            "POST",
            "api/contact/submit",
            200,
            data=test_data
        )
        
        if success and response.get('success'):
            print(f"   ✅ Form submitted successfully")
            print(f"   Message: {response.get('message', '')}")
        
        return success

    def test_contact_form_missing_fields(self):
        """Test contact form with missing required fields"""
        test_data = {
            "first_name": "Jean",
            "email": "jean.dupont@test.com"
        }
        
        success, response = self.run_test(
            "Contact Form - Missing Fields",
            "POST",
            "api/contact/submit",
            400,
            data=test_data
        )
        
        if success:
            print(f"   ✅ Correctly rejected incomplete form")
        
        return success

    def print_summary(self):
        """Print test summary"""
        print("\n" + "="*60)
        print(f"📊 Test Summary")
        print("="*60)
        print(f"Total Tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed}")
        print(f"Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        if self.failed_tests:
            print("\n❌ Failed Tests:")
            for i, test in enumerate(self.failed_tests, 1):
                print(f"\n{i}. {test.get('test', 'Unknown')}")
                if 'error' in test:
                    print(f"   Error: {test['error']}")
                else:
                    print(f"   Expected: {test.get('expected')}, Got: {test.get('actual')}")
                    print(f"   Response: {test.get('response', '')}")
        
        print("\n" + "="*60)

def main():
    print("="*60)
    print("Bitcoin Suisse Clone - Backend API Testing")
    print("="*60)
    
    tester = BitcoinSuisseAPITester()
    
    # Run all tests
    print("\n🚀 Starting API Tests...\n")
    
    tester.test_health_check()
    tester.test_get_news()
    tester.test_contact_form_valid()
    tester.test_contact_form_missing_fields()
    
    # Print summary
    tester.print_summary()
    
    # Return exit code
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())
