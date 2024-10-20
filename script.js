document.addEventListener('DOMContentLoaded', () => {
	const searchBox = document.getElementById('search-box');
	const searchButton = document.getElementById('search-button');
	const studentModal = document.getElementById('student-modal');
	const closeModalButton = document.querySelector('.close');
	const tableBody = document.querySelector('#student-table tbody'); // 直接获取表格主体  

	// 使用列表（数组）来存储学生的数据，每个学生数据中包含个人信息和对应公司名称  
	let companies = [{
			studentName: '张三',
			company: 'A'
		},
		{
			studentName: '李四',
			company: 'C'
		},
		{
			studentName: '王五',
			company: 'B'
		},
		{
			studentName: '赵六',
			company: 'D'
		},
		{
			studentName: '孙七',
			company: 'A'
		},
		{
			studentName: '周八',
			company: 'C'
		},
		{
			studentName: '吴九',
			company: 'B'
		},
		{
			studentName: '郑十',
			company: 'D'
		}
	];

	const generateChineseName = () => {
		const surnames = ['赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨',
			'朱', '秦', '尤', '许'
		];
		const givenNames = ['伟', '刚', '勇', '毅', '俊', '峰', '强', '军', '平', '保', '东', '文', '辉', '力', '明', '永',
			'健', '世', '广', '志', '义', '兴', '良', '海', '山', '仁', '波', '宁', '贵', '福', '生', '龙', '元', '全',
			'国', '胜', '学', '祥', '才', '发', '武', '新', '利', '清', '飞', '彪', '宏', '德', '光', '天', '达', '安',
			'岩', '中', '茂', '进', '林', '有', '坚', '和', '彬', '柏', '楠', '榕', '航', '明', '彪', '旭', '东', '钢',
			'发', '武', '新', '利', '清', '飞', '继', '晓', '康', '星', '光', '天', '达', '安', '岩'
		];
		const surname = surnames[Math.floor(Math.random() * surnames.length)];
		const givenName = givenNames[Math.floor(Math.random() * givenNames.length)];
		return `${surname}${givenName}`;
	};

	const generateRandomStudentArray = (count) => {
		const companies_name = ['A', 'B', 'C', 'D'];
		const students = [];
		for (let i = 0; i < count; i++) {
			companies.push({
				studentName: generateChineseName(),
				company: companies_name[Math.floor(Math.random() * companies_name.length)]
			});
		}
	};

	generateRandomStudentArray(100);
	// 为了方便搜索，创建一个映射来快速查找属于特定公司的学生  
	const companiesByName = {};
	companies.forEach(student => {
		if (!companiesByName[student.company]) {
			companiesByName[student.company] = [];
		}
		companiesByName[student.company].push(student);
	});



	searchButton.addEventListener('click', () => {
		studentModal.classList.remove('animate__backInUp');
		setTimeout(() => {
			element.classList.add('animate__backInUp');
		}, 10);
		const searchTerm = searchBox.value.trim().toLowerCase();
		const matchedCompanies = Object.keys(companiesByName).filter(companyName => companyName
			.toLowerCase().includes(searchTerm));

		if (matchedCompanies.length > 0) {
			// 清空表格主体内容  
			tableBody.innerHTML = '';

			// 使用for循环遍历匹配的公司名称，并为其动态创建表格行和单元格  
			matchedCompanies.forEach(companyName => {
				const students = companiesByName[companyName];
				students.forEach(student => {
					const row = document.createElement('tr');

					// 学生姓名单元格  
					const studentCell = document.createElement('td');
					studentCell.textContent = student.studentName;
					row.appendChild(studentCell);

					// 公司名称单元格  
					const companyCell = document.createElement('td');
					companyCell.textContent = companyName;
					row.appendChild(companyCell);

					tableBody.appendChild(row);
				});
			});

			studentModal.style.display = 'block';
		} else {
			alert('没有对应公司的信息哦');
		}
	});

	closeModalButton.addEventListener('click', () => {
		studentModal.style.display = 'none';
		// 清空表格主体内容  
		tableBody.innerHTML = '';
	});

	// Close modal if user clicks outside of the modal content (except on the modal itself)  
	window.onclick = (event) => {
		if (event.target === studentModal && !(event.target === studentModal.querySelector(
				'.modal-content') || studentModal.querySelector('.modal-content').contains(event
				.target))) {
			studentModal.style.display = 'none';
			// 同样清空表格主体内容  
			tableBody.innerHTML = '';
		}
	};

	// Prevent the modal from closing if the click event is inside the modal content  
	studentModal.querySelector('.modal-content').addEventListener('click', (event) => {
		event.stopPropagation();
	});
});