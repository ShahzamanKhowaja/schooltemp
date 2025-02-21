document.getElementById('resultForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const rollNumber = document.querySelector('.result-input').value;
    fetchResult(rollNumber);
});

function fetchResult(rollNumber) {
    // Simulate fetching result from a server
    const results = {
        'EXL2023001': {
            name: 'Rahul Sharma',
            class: 'X-A',
            roll: 'EXL2023001',
            photo: 'istockphoto-1336063208-612x612.jpg',
            marks: [
                { subject: 'Mathematics', maxMarks: 100, obtainedMarks: 95 },
                { subject: 'Science', maxMarks: 100, obtainedMarks: 90 },
                { subject: 'English', maxMarks: 100, obtainedMarks: 88 },
                { subject: 'Social Studies', maxMarks: 100, obtainedMarks: 92 },
                { subject: 'Hindi', maxMarks: 100, obtainedMarks: 85 }
            ]
        }
        // Add more results as needed
    };

    const result = results[rollNumber];
    if (result) {
        displayResult(result);
    } else {
        document.getElementById('resultDisplay').style.display = 'none';
        document.getElementById('noResult').style.display = 'block';
    }
}

function displayResult(result) {
    document.getElementById('studentName').textContent = result.name;
    document.getElementById('studentClass').textContent = result.class;
    document.getElementById('studentRoll').textContent = result.roll;
    document.querySelector('.student-photo img').src = result.photo;

    const marksTableBody = document.getElementById('marksTableBody');
    marksTableBody.innerHTML = '';
    let totalMarks = 0;
    let maxMarks = 0;

    result.marks.forEach(mark => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${mark.subject}</td>
            <td>${mark.maxMarks}</td>
            <td>${mark.obtainedMarks}</td>
            <td>${((mark.obtainedMarks / mark.maxMarks) * 100).toFixed(2)}%</td>
        `;
        marksTableBody.appendChild(row);
        totalMarks += mark.obtainedMarks;
        maxMarks += mark.maxMarks;
    });

    document.getElementById('totalMarks').textContent = totalMarks;
    document.getElementById('maxMarks').textContent = maxMarks;
    document.getElementById('percentage').textContent = ((totalMarks / maxMarks) * 100).toFixed(2);
    document.getElementById('resultStatus').textContent = totalMarks / maxMarks >= 0.4 ? 'PASS' : 'FAIL';
    document.getElementById('grade').textContent = getGrade(totalMarks / maxMarks);

    document.getElementById('resultDisplay').style.display = 'block';
    document.getElementById('noResult').style.display = 'none';
}

function getGrade(percentage) {
    if (percentage >= 0.9) return 'A';
    if (percentage >= 0.8) return 'B';
    if (percentage >= 0.7) return 'C';
    if (percentage >= 0.6) return 'D';
    return 'E';
}

document.addEventListener('DOMContentLoaded', function() {
    const imageCards = document.querySelectorAll('.image-card');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.5 });

    imageCards.forEach(card => {
        observer.observe(card);
    });
});
