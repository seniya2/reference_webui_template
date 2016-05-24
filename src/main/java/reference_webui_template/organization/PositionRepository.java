package reference_webui_template.organization;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "position", path = "position")
public interface PositionRepository extends PagingAndSortingRepository<Position, Long>{

	
}
