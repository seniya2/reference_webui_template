package com.polarisoffice.kaia.newtech.prototype.domain;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class TechAssessmentType {

	public @Id @GeneratedValue Long id;
	
	public String title;	

}
