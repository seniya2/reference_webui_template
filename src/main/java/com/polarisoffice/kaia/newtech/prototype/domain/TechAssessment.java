package com.polarisoffice.kaia.newtech.prototype.domain;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

public class TechAssessment {

	public @Id @GeneratedValue Long id;

	public String title;
	public @OneToOne NewTech tech;
	public @OneToOne TechAssessmentType type;

	
	
	
}
