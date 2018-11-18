import Firebase from '../../../helpers/firebase/index';

export default function updateUserProfile(uid, temp) {
	Firebase.database().ref('users/' + uid).set({
		    name: "Karan Grover",
			email: "16227018@life.hkbu.edu.hk",
			imgSrc: "https://image.ibb.co/gtHLHG/IMG_1793.jpg",
			title: "Mr. ",
			type: "prof",
			activated: true,
			description: "Teaching at the Hong Kong Baptist University for 6 years. Department head of Computer Science",
			fbUrl: temp.fbUrl,
			twitter: temp.twitter, 
			googlePlus: temp.googlePlus,
			linkedIn: temp.linkedIn,
			courseList: [{
			  courseCode: "COMP4095",
			  courseName: "Information Systems Management and Professional Practices",
			  teachingA: "Mr. Zexiong CAI",
			  venue: "AAB305",
			  studentCount: 35
			}, 
			{
			  courseCode: "COMP4007",
			  courseName: "Sofware Design, Development and Testing",
			  teachingA: "Mr. Wong",
			  venue: "FSC 901",
			  studentCount: 21
			}, 
			{
			  courseCode: "COMP3046",
			  courseName: "Advanced Programming for Software Development",
			  teachingA: "Mr Lau",
			  venue: "WLB202",
			  studentCount: 27
			},
			{
			  courseCode: "COMP4096",
			  courseName: "Business Intelligence and Decision Support",
			  teachingA: "Mr Chan",
			  venue: "LT2",
			  studentCount: 29
			}
			],
			notes: [{
				  id: 0,
				  note: "Open Assignment box for COMP4095",
				  createTime: "2017-02-10T07:42:44.828Z",
				  color: 0
				}, 
				{
				  id: 1,
				  note: "Upload notes on design patterns for COMP4007",
				  createTime: "2017-04-08T03:17:31.999Z",
				  color: 0
				}, 
				{
				  id: 2,
				  note: "Announce presentation dates and times for COMP3046",
				  createTime: "2017-01-21T05:43:16.889Z",
				  color: 3
				}, 
				{
				  id: 3,
				  note: "Grant access to student number -> 17248018",
				  createTime: "2017-01-08T23:36:05.692Z",
				  color: 4
				}, 
				{
				  id: 4,
				  note: "Update notes for week 3",
				  createTime: "2017-05-11T22:30:14.915Z",
				  color: 4
				}
			]
	  	});
}