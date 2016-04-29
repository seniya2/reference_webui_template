package reference_webui_template.apple;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "apple", path = "apple")
public interface AppleRepositoryRestResource extends PagingAndSortingRepository<Apple, Long>{

	
}
